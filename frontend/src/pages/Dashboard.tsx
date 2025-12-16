import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QueryChat from '../components/QueryChat';
import SQLPreview from '../components/SQLPreview';
import ResultsTable from '../components/ResultsTable';
import InsightsPanel from '../components/InsightsPanel';
import RealtimeIndicator from '../components/RealtimeIndicator';
import { queryAPI } from '../services/apiService';
import {
    subscribeToQueryEvents,
    unsubscribeFromQueryEvents,
} from '../services/socketService';

interface Message {
    type: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentSQL, setCurrentSQL] = useState('');
    const [currentExplanation, setCurrentExplanation] = useState('');
    const [currentResults, setCurrentResults] = useState<any[]>([]);
    const [currentInsights, setCurrentInsights] = useState('');
    const [executionTime, setExecutionTime] = useState<number>(0);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        // Subscribe to real-time events
        subscribeToQueryEvents({
            onStart: (data) => {
                console.log('Query started:', data);
                addMessage('system', 'Processing your question...');
            },
            onSQLGenerated: (data) => {
                console.log('SQL generated:', data);
                setCurrentSQL(data.sql);
                setCurrentExplanation(data.explanation);
                addMessage('assistant', `Generated SQL query. Executing...`);
            },
            onResults: (data) => {
                console.log('Results received:', data);
                setCurrentResults(data.results);
                setExecutionTime(data.executionTime);
                addMessage('assistant', `Retrieved ${data.results.length} rows in ${data.executionTime}ms`);
            },
            onInsights: (data) => {
                console.log('Insights generated:', data);
                setCurrentInsights(data.insights);
                addMessage('assistant', 'Business insights generated successfully!');
            },
            onError: (data) => {
                console.error('Query error:', data);
                addMessage('system', `Error: ${data.error}`);
                setLoading(false);
            },
            onComplete: (data) => {
                console.log('Query complete:', data);
                setLoading(false);
            },
        });

        return () => {
            unsubscribeFromQueryEvents();
        };
    }, []);

    const addMessage = useCallback((type: Message['type'], content: string) => {
        setMessages((prev) => [...prev, { type, content, timestamp: new Date() }]);
    }, []);

    const handleSubmitQuery = async (question: string) => {
        setLoading(true);
        setCurrentSQL('');
        setCurrentExplanation('');
        setCurrentResults([]);
        setCurrentInsights('');
        setExecutionTime(0);

        // Add user message
        addMessage('user', question);

        try {
            // The actual query processing is handled via WebSocket events
            await queryAPI.submit(question);
        } catch (error: any) {
            addMessage('system', error.response?.data?.error || 'Failed to process query');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

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
                        QuerySense
                    </h1>
                    <RealtimeIndicator />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                        {user?.email}
                    </span>
                    {user?.role === 'admin' && (
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => navigate('/admin')}
                        >
                            Admin Panel
                        </button>
                    )}
                    <button className="btn btn-sm btn-secondary" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--space-lg)',
                    padding: 'var(--space-lg)',
                    overflow: 'hidden',
                }}
            >
                {/* Left Column - Chat */}
                <div
                    className="glass-card"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        padding: 0,
                        overflow: 'hidden',
                    }}
                >
                    <QueryChat
                        onSubmitQuery={handleSubmitQuery}
                        loading={loading}
                        messages={messages}
                    />
                </div>

                {/* Right Column - Results */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-lg)',
                        overflowY: 'auto',
                        height: '100%',
                    }}
                >
                    {currentSQL && (
                        <SQLPreview sql={currentSQL} explanation={currentExplanation} />
                    )}

                    {currentResults.length > 0 && (
                        <ResultsTable results={currentResults} executionTime={executionTime} />
                    )}

                    {currentInsights && <InsightsPanel insights={currentInsights} />}

                    {!currentSQL && !currentResults.length && !currentInsights && (
                        <div
                            className="glass-card"
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <div>
                                <p style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>📊</p>
                                <h3>Query results will appear here</h3>
                                <p style={{ color: 'var(--color-text-secondary)' }}>
                                    Ask a question to get started
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
