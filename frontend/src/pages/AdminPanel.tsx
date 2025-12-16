import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adminAPI } from '../services/apiService';
import RealtimeIndicator from '../components/RealtimeIndicator';

const AdminPanel: React.FC = () => {
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const response = await adminAPI.getAnalytics();
            setAnalytics(response.data);
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="page" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner" style={{ width: '48px', height: '48px' }} />
            </div>
        );
    }

    const stats = [
        {
            label: 'Total Users',
            value: analytics?.summary?.totalUsers || 0,
            icon: '👥',
            gradient: 'var(--gradient-primary)',
        },
        {
            label: 'Total Queries',
            value: analytics?.summary?.totalQueries || 0,
            icon: '📊',
            gradient: 'var(--gradient-success)',
        },
        {
            label: 'Queries Today',
            value: analytics?.summary?.queriesToday || 0,
            icon: '⚡',
            gradient: 'var(--gradient-warning)',
        },
        {
            label: 'Avg Execution Time',
            value: `${analytics?.summary?.avgExecutionTime || 0}ms`,
            icon: '⏱️',
            gradient: 'var(--gradient-accent)',
        },
    ];

    return (
        <div className="page">
            {/* Header */}
            <header
                style={{
                    padding: 'var(--space-lg) var(--space-xl)',
                    borderBottom: '1px solid var(--color-glass-border)',
                    background: 'var(--color-bg-secondary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                    <h1
                        style={{
                            fontSize: '1.5rem',
                            margin: 0,
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Admin Panel
                    </h1>
                    <RealtimeIndicator />
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => navigate('/dashboard')}
                    >
                        Back to Dashboard
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={loadAnalytics}>
                        🔄 Refresh
                    </button>
                </div>
            </header>

            {/* Content */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 'var(--space-xl)',
                }}
            >
                {/* Stats Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: 'var(--space-lg)',
                        marginBottom: 'var(--space-2xl)',
                    }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: stat.gradient,
                                padding: 'var(--space-xl)',
                                textAlign: 'center',
                            }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-sm)' }}>
                                {stat.icon}
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Queries */}
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 style={{ marginBottom: 'var(--space-lg)' }}>Recent Queries</h2>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Question</th>
                                    <th>Time</th>
                                    <th>Execution</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics?.recentQueries?.map((query: any, index: number) => (
                                    <tr key={query.id}>
                                        <td>{query.user_email}</td>
                                        <td style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {query.question}
                                        </td>
                                        <td>{new Date(query.created_at).toLocaleString()}</td>
                                        <td>
                                            <span className="badge badge-info">
                                                {query.execution_time || 0}ms
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Active Users */}
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{ marginTop: 'var(--space-lg)' }}
                >
                    <h2 style={{ marginBottom: 'var(--space-lg)' }}>Most Active Users</h2>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Total Queries</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics?.activeUsers?.map((user: any) => (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className="badge badge-success">
                                                {user.query_count}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminPanel;
