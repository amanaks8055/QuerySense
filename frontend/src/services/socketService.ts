import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

let socket: Socket | null = null;

// Socket event types
export interface QueryEvent {
    queryId: number;
    timestamp: Date;
}

export interface SQLGeneratedEvent extends QueryEvent {
    sql: string;
    explanation: string;
}

export interface QueryResultsEvent extends QueryEvent {
    results: any[];
    executionTime: number;
}

export interface InsightsEvent extends QueryEvent {
    insights: string;
}

export interface QueryErrorEvent extends QueryEvent {
    error: string;
}

/**
 * Initialize Socket.IO connection
 */
export const connectSocket = (token: string): Socket => {
    if (socket?.connected) {
        return socket;
    }

    socket = io(SOCKET_URL, {
        auth: {
            token,
        },
        transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
        console.log('✅ WebSocket connected');
    });

    socket.on('disconnect', () => {
        console.log('❌ WebSocket disconnected');
    });

    socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
    });

    return socket;
};

/**
 * Disconnect socket
 */
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

/**
 * Get current socket instance
 */
export const getSocket = (): Socket | null => {
    return socket;
};

/**
 * Subscribe to query lifecycle events
 */
export const subscribeToQueryEvents = (callbacks: {
    onStart?: (data: QueryEvent) => void;
    onSQLGenerated?: (data: SQLGeneratedEvent) => void;
    onExecuting?: (data: QueryEvent) => void;
    onResults?: (data: QueryResultsEvent) => void;
    onInsights?: (data: InsightsEvent) => void;
    onError?: (data: QueryErrorEvent) => void;
    onComplete?: (data: QueryEvent) => void;
}) => {
    if (!socket) return;

    if (callbacks.onStart) {
        socket.on('query:start', callbacks.onStart);
    }
    if (callbacks.onSQLGenerated) {
        socket.on('query:sql-generated', callbacks.onSQLGenerated);
    }
    if (callbacks.onExecuting) {
        socket.on('query:executing', callbacks.onExecuting);
    }
    if (callbacks.onResults) {
        socket.on('query:results', callbacks.onResults);
    }
    if (callbacks.onInsights) {
        socket.on('query:insights', callbacks.onInsights);
    }
    if (callbacks.onError) {
        socket.on('query:error', callbacks.onError);
    }
    if (callbacks.onComplete) {
        socket.on('query:complete', callbacks.onComplete);
    }
};

/**
 * Unsubscribe from query events
 */
export const unsubscribeFromQueryEvents = () => {
    if (!socket) return;

    socket.off('query:start');
    socket.off('query:sql-generated');
    socket.off('query:executing');
    socket.off('query:results');
    socket.off('query:insights');
    socket.off('query:error');
    socket.off('query:complete');
};

/**
 * Subscribe to admin events
 */
export const subscribeToAdminEvents = (callbacks: {
    onNewQuery?: (data: any) => void;
}) => {
    if (!socket) return;

    if (callbacks.onNewQuery) {
        socket.on('admin:new-query', callbacks.onNewQuery);
    }
};

/**
 * Check if socket is connected
 */
export const isConnected = (): boolean => {
    return socket?.connected || false;
};
