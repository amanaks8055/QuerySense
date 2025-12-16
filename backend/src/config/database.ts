import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL connection pool
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'querysense',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Test connection
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err);
    process.exit(-1);
});

// Query helper with error handling
export const query = async (text: string, params?: any[]): Promise<QueryResult<any>> => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

// Safe query execution for user-generated SQL (read-only)
export const executeUserQuery = async (sqlQuery: string): Promise<any> => {
    const start = Date.now();

    // Safety check: only allow SELECT statements
    const normalizedQuery = sqlQuery.trim().toLowerCase();
    if (!normalizedQuery.startsWith('select')) {
        throw new Error('Only SELECT queries are allowed');
    }

    // Check for dangerous keywords
    const dangerousKeywords = ['drop', 'delete', 'update', 'insert', 'alter', 'create', 'truncate', 'grant', 'revoke'];
    if (dangerousKeywords.some(keyword => normalizedQuery.includes(keyword))) {
        throw new Error('Query contains forbidden operations');
    }

    try {
        // Set statement timeout to 10 seconds
        await pool.query('SET statement_timeout = 10000');

        const res = await pool.query(sqlQuery);
        const executionTime = Date.now() - start;

        return {
            rows: res.rows,
            rowCount: res.rowCount,
            executionTime,
        };
    } catch (error: any) {
        console.error('User query execution error:', error);
        throw new Error(`Query execution failed: ${error.message}`);
    }
};

export default pool;
