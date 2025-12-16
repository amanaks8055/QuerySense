// Database Models and Types

export interface User {
    id: number;
    email: string;
    password: string;
    role: 'user' | 'admin';
    created_at: Date;
}

export interface Query {
    id: number;
    user_id: number;
    question: string;
    sql_query: string;
    explanation: string;
    created_at: Date;
}

export interface QueryResult {
    id: number;
    query_id: number;
    result_data: any;
    insights: string;
    execution_time: number;
    created_at: Date;
}

export interface AuthPayload {
    userId: number;
    email: string;
    role: string;
}

export interface QueryRequest {
    question: string;
}

export interface AIResponse {
    sql: string;
    explanation: string;
}

export interface InsightsResponse {
    insights: string;
    summary: string;
    keyFindings: string[];
}
