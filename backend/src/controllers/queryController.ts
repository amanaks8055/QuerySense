import { Request, Response } from 'express';
import { query, executeUserQuery } from '../config/database';
import { convertToSQL, generateInsights } from '../services/aiService';
import {
    emitQueryStart,
    emitSQLGenerated,
    emitQueryExecuting,
    emitQueryResults,
    emitInsightsGenerated,
    emitQueryComplete,
    emitQueryError,
} from '../services/realtimeService';

/**
 * Submit a new query
 */
export const submitQuery = async (req: Request, res: Response) => {
    try {
        const { question } = req.body;
        const userId = req.user?.userId;

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Create query record
        const queryResult = await query(
            'INSERT INTO queries (user_id, question, sql_query, explanation) VALUES ($1, $2, $3, $4) RETURNING id',
            [userId, question, '', '']
        );

        const queryId = queryResult.rows[0].id;

        // Emit query start event
        emitQueryStart(userId, queryId, question);

        // Step 1: Convert to SQL using AI
        let sqlQuery: string;
        let explanation: string;

        try {
            const aiResponse = await convertToSQL(question);
            sqlQuery = aiResponse.sql;
            explanation = aiResponse.explanation;

            // Update query with SQL and explanation
            await query(
                'UPDATE queries SET sql_query = $1, explanation = $2 WHERE id = $3',
                [sqlQuery, explanation, queryId]
            );

            // Emit SQL generated event
            emitSQLGenerated(userId, queryId, sqlQuery, explanation);
        } catch (error: any) {
            emitQueryError(userId, queryId, 'Failed to convert question to SQL');
            return res.status(500).json({ error: 'AI conversion failed', details: error.message });
        }

        // Step 2: Execute SQL query
        emitQueryExecuting(userId, queryId);

        let results: any[];
        let executionTime: number;

        try {
            const executionResult = await executeUserQuery(sqlQuery);
            results = executionResult.rows;
            executionTime = executionResult.executionTime;

            // Emit results
            emitQueryResults(userId, queryId, results, executionTime);
        } catch (error: any) {
            emitQueryError(userId, queryId, error.message);
            return res.status(500).json({ error: 'Query execution failed', details: error.message });
        }

        // Step 3: Generate insights
        let insights = '';
        try {
            insights = await generateInsights(question, results);
            emitInsightsGenerated(userId, queryId, insights);
        } catch (error) {
            console.error('Insights generation error:', error);
            insights = 'Unable to generate insights';
        }

        // Step 4: Save results
        await query(
            'INSERT INTO query_results (query_id, result_data, insights, execution_time) VALUES ($1, $2, $3, $4)',
            [queryId, JSON.stringify(results), insights, executionTime]
        );

        // Emit query complete
        emitQueryComplete(userId, queryId);

        // Return final response
        res.json({
            queryId,
            question,
            sql: sqlQuery,
            explanation,
            results,
            insights,
            executionTime,
        });
    } catch (error: any) {
        console.error('Query submission error:', error);
        res.status(500).json({ error: 'Query submission failed', details: error.message });
    }
};

/**
 * Get query history for current user
 */
export const getQueryHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const limit = parseInt(req.query.limit as string) || 20;
        const offset = parseInt(req.query.offset as string) || 0;

        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const result = await query(
            `SELECT 
        q.id,
        q.question,
        q.sql_query,
        q.explanation,
        q.created_at,
        qr.result_data,
        qr.insights,
        qr.execution_time
      FROM queries q
      LEFT JOIN query_results qr ON q.id = qr.query_id
      WHERE q.user_id = $1
      ORDER BY q.created_at DESC
      LIMIT $2 OFFSET $3`,
            [userId, limit, offset]
        );

        res.json({
            queries: result.rows,
            total: result.rowCount,
        });
    } catch (error) {
        console.error('Query history fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch query history' });
    }
};

/**
 * Get single query by ID
 */
export const getQueryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const result = await query(
            `SELECT 
        q.id,
        q.user_id,
        q.question,
        q.sql_query,
        q.explanation,
        q.created_at,
        qr.result_data,
        qr.insights,
        qr.execution_time
      FROM queries q
      LEFT JOIN query_results qr ON q.id = qr.query_id
      WHERE q.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Query not found' });
        }

        const queryData = result.rows[0];

        // Check if user owns this query or is admin
        if (queryData.user_id !== userId && req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json({ query: queryData });
    } catch (error) {
        console.error('Query fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch query' });
    }
};
