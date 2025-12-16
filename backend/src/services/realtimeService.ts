import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../models/schema';

let io: SocketIOServer;

/**
 * Initialize Socket.IO server for real-time communication
 */
export const initializeSocketIO = (server: HttpServer) => {
    io = new SocketIOServer(server, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    // Authentication middleware for Socket.IO
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication required'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as AuthPayload;
            socket.data.user = decoded;
            next();
        } catch (error) {
            next(new Error('Invalid token'));
        }
    });

    io.on('connection', (socket) => {
        const user = socket.data.user;
        console.log(`✅ User connected via WebSocket: ${user.email}`);

        // Join user to their personal room
        socket.join(`user:${user.userId}`);

        // Join admin to admin room
        if (user.role === 'admin') {
            socket.join('admin');
        }

        socket.on('disconnect', () => {
            console.log(`❌ User disconnected: ${user.email}`);
        });
    });

    console.log('✅ Socket.IO initialized');
    return io;
};

/**
 * Get Socket.IO instance
 */
export const getIO = (): SocketIOServer => {
    if (!io) {
        throw new Error('Socket.IO not initialized');
    }
    return io;
};

/**
 * Emit query start event to user
 */
export const emitQueryStart = (userId: number, queryId: number, question: string) => {
    io.to(`user:${userId}`).emit('query:start', {
        queryId,
        question,
        timestamp: new Date(),
    });
};

/**
 * Emit SQL generation event
 */
export const emitSQLGenerated = (userId: number, queryId: number, sql: string, explanation: string) => {
    io.to(`user:${userId}`).emit('query:sql-generated', {
        queryId,
        sql,
        explanation,
        timestamp: new Date(),
    });
};

/**
 * Emit query execution event
 */
export const emitQueryExecuting = (userId: number, queryId: number) => {
    io.to(`user:${userId}`).emit('query:executing', {
        queryId,
        timestamp: new Date(),
    });
};

/**
 * Emit query results
 */
export const emitQueryResults = (
    userId: number,
    queryId: number,
    results: any[],
    executionTime: number
) => {
    io.to(`user:${userId}`).emit('query:results', {
        queryId,
        results,
        executionTime,
        timestamp: new Date(),
    });
};

/**
 * Emit insights generated
 */
export const emitInsightsGenerated = (userId: number, queryId: number, insights: string) => {
    io.to(`user:${userId}`).emit('query:insights', {
        queryId,
        insights,
        timestamp: new Date(),
    });
};

/**
 * Emit query error
 */
export const emitQueryError = (userId: number, queryId: number, error: string) => {
    io.to(`user:${userId}`).emit('query:error', {
        queryId,
        error,
        timestamp: new Date(),
    });
};

/**
 * Emit query complete
 */
export const emitQueryComplete = (userId: number, queryId: number) => {
    io.to(`user:${userId}`).emit('query:complete', {
        queryId,
        timestamp: new Date(),
    });

    // Also notify admin room of new query
    io.to('admin').emit('admin:new-query', {
        userId,
        queryId,
        timestamp: new Date(),
    });
};

/**
 * Broadcast system message to all users
 */
export const broadcastSystemMessage = (message: string) => {
    io.emit('system:message', {
        message,
        timestamp: new Date(),
    });
};
