import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeSocketIO } from './services/realtimeService';
import authRoutes from './routes/auth';
import queryRoutes from './routes/query';
import adminRoutes from './routes/admin';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({
        name: 'QuerySense API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            auth: '/api/auth',
            query: '/api/query',
            admin: '/api/admin',
        },
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// Initialize Socket.IO
initializeSocketIO(httpServer);

// Start server
httpServer.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║     🚀 QuerySense Backend Server     ║
╚═══════════════════════════════════════╝
  
  Port: ${PORT}
  Environment: ${process.env.NODE_ENV || 'development'}
  Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}
  
  API Endpoints:
  - POST   /api/auth/register
  - POST   /api/auth/login
  - GET    /api/auth/profile
  - POST   /api/query
  - GET    /api/query/history
  - GET    /api/query/:id
  - GET    /api/admin/analytics
  - GET    /api/admin/users
  - GET    /api/admin/queries
  
  WebSocket: Connected ✓
  Database: Connected ✓
  AI Service: OpenRouter ✓
  
  Ready to accept connections!
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    httpServer.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
