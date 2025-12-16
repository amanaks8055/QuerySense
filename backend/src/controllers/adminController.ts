import { Request, Response } from 'express';
import { query } from '../config/database';

/**
 * Get admin dashboard analytics
 */
export const getAnalytics = async (req: Request, res: Response) => {
    try {
        // Total users
        const totalUsersResult = await query('SELECT COUNT(*) as count FROM users');
        const totalUsers = parseInt(totalUsersResult.rows[0].count);

        // Total queries
        const totalQueriesResult = await query('SELECT COUNT(*) as count FROM queries');
        const totalQueries = parseInt(totalQueriesResult.rows[0].count);

        // Queries today
        const queriesTodayResult = await query(
            `SELECT COUNT(*) as count FROM queries 
       WHERE created_at >= CURRENT_DATE`
        );
        const queriesToday = parseInt(queriesTodayResult.rows[0].count);

        // Average execution time
        const avgExecTimeResult = await query(
            'SELECT AVG(execution_time) as avg_time FROM query_results'
        );
        const avgExecutionTime = parseFloat(avgExecTimeResult.rows[0].avg_time || '0');

        // Queries per day (last 7 days)
        const queriesPerDayResult = await query(
            `SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
       FROM queries
       WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
       GROUP BY DATE(created_at)
       ORDER BY date DESC`
        );

        // Most active users
        const activeUsersResult = await query(
            `SELECT 
        u.id,
        u.email,
        COUNT(q.id) as query_count
       FROM users u
       LEFT JOIN queries q ON u.id = q.user_id
       GROUP BY u.id, u.email
       ORDER BY query_count DESC
       LIMIT 10`
        );

        // Recent queries (all users)
        const recentQueriesResult = await query(
            `SELECT 
        q.id,
        q.question,
        q.created_at,
        u.email as user_email,
        qr.execution_time
       FROM queries q
       JOIN users u ON q.user_id = u.id
       LEFT JOIN query_results qr ON q.id = qr.query_id
       ORDER BY q.created_at DESC
       LIMIT 20`
        );

        res.json({
            summary: {
                totalUsers,
                totalQueries,
                queriesToday,
                avgExecutionTime: Math.round(avgExecutionTime),
            },
            queriesPerDay: queriesPerDayResult.rows,
            activeUsers: activeUsersResult.rows,
            recentQueries: recentQueriesResult.rows,
        });
    } catch (error) {
        console.error('Analytics fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};

/**
 * Get all users (admin only)
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await query(
            `SELECT 
        u.id,
        u.email,
        u.role,
        u.created_at,
        COUNT(q.id) as query_count
       FROM users u
       LEFT JOIN queries q ON u.id = q.user_id
       GROUP BY u.id, u.email, u.role, u.created_at
       ORDER BY u.created_at DESC`
        );

        res.json({ users: result.rows });
    } catch (error) {
        console.error('Users fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

/**
 * Get all queries (admin only)
 */
export const getAllQueries = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50;
        const offset = parseInt(req.query.offset as string) || 0;

        const result = await query(
            `SELECT 
        q.id,
        q.question,
        q.sql_query,
        q.created_at,
        u.email as user_email,
        qr.execution_time
       FROM queries q
       JOIN users u ON q.user_id = u.id
       LEFT JOIN query_results qr ON q.id = qr.query_id
       ORDER BY q.created_at DESC
       LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        const totalResult = await query('SELECT COUNT(*) as count FROM queries');
        const total = parseInt(totalResult.rows[0].count);

        res.json({
            queries: result.rows,
            total,
            limit,
            offset,
        });
    } catch (error) {
        console.error('All queries fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch queries' });
    }
};
