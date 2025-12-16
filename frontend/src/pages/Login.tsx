import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/apiService';
import { connectSocket } from '../services/socketService';
import { motion } from 'framer-motion';
import '../styles/index.css';

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = isLogin
                ? await authAPI.login(email, password)
                : await authAPI.register(email, password);

            const { token, user } = response.data;

            // Store auth data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Connect WebSocket
            connectSocket(token);

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '400px', padding: '0 1rem' }}
            >
                {/* Logo and Title */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
                    <motion.h1
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            fontSize: '3rem',
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginBottom: 'var(--space-sm)',
                        }}
                    >
                        QuerySense
                    </motion.h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
                        AI-Powered SQL Assistant
                    </p>
                </div>

                {/* Login/Register Card */}
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <label
                                htmlFor="email"
                                style={{
                                    display: 'block',
                                    marginBottom: 'var(--space-xs)',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <label
                                htmlFor="password"
                                style={{
                                    display: 'block',
                                    marginBottom: 'var(--space-xs)',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                }}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    padding: 'var(--space-sm)',
                                    background: 'rgba(245, 87, 108, 0.1)',
                                    border: '1px solid rgba(245, 87, 108, 0.3)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--color-warning)',
                                    fontSize: '0.875rem',
                                    marginBottom: 'var(--space-lg)',
                                }}
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%' }}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner" />
                            ) : isLogin ? (
                                'Sign In'
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-primary)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                            }}
                        >
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </motion.div>

                {/* Demo Credentials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        marginTop: 'var(--space-lg)',
                        padding: 'var(--space-md)',
                        background: 'rgba(102, 126, 234, 0.05)',
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-secondary)',
                    }}
                >
                    <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Demo Credentials:</div>
                    <div>User: demo@querysense.app / demo123</div>
                    <div>Admin: admin@querysense.app / admin123</div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Login;
