import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    type: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

interface QueryChatProps {
    onSubmitQuery: (question: string) => void;
    loading: boolean;
    messages: Message[];
}

const QueryChat: React.FC<QueryChatProps> = ({ onSubmitQuery, loading, messages }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !loading) {
            onSubmitQuery(input.trim());
            setInput('');
        }
    };

    const suggestedQueries = [
        'Show me all customers from USA',
        'What are the top 5 best-selling products?',
        'Calculate total revenue by product category',
        'List pending orders from the last week',
    ];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                gap: 'var(--space-lg)',
            }}
        >
            {/* Messages Area */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 'var(--space-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-md)',
                }}
            >
                {messages.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
                        <h2 style={{ marginBottom: 'var(--space-md)' }}>
                            Ask me anything about your data
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
                            I'll convert your question to SQL and execute it
                        </p>

                        {/* Suggested Queries */}
                        <div style={{ display: 'grid', gap: 'var(--space-md)', maxWidth: '600px', margin: '0 auto' }}>
                            {suggestedQueries.map((query, index) => (
                                <motion.button
                                    key={index}
                                    className="glass-card"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setInput(query)}
                                    style={{
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        border: '1px solid var(--color-glass-border)',
                                        background: 'var(--color-glass)',
                                        padding: 'var(--space-md)',
                                    }}
                                >
                                    <span style={{ fontSize: '0.875rem' }}>💡 {query}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <AnimatePresence>
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: 'flex',
                                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: '80%',
                                        padding: 'var(--space-md)',
                                        borderRadius: 'var(--radius-lg)',
                                        background:
                                            message.type === 'user'
                                                ? 'var(--gradient-primary)'
                                                : message.type === 'system'
                                                    ? 'rgba(79, 172, 254, 0.1)'
                                                    : 'var(--color-bg-elevated)',
                                        border:
                                            message.type === 'system'
                                                ? '1px solid rgba(79, 172, 254, 0.3)'
                                                : 'none',
                                    }}
                                >
                                    <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>
                                        {message.content}
                                    </p>
                                    <div
                                        style={{
                                            marginTop: 'var(--space-xs)',
                                            fontSize: '0.7rem',
                                            opacity: 0.7,
                                        }}
                                    >
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Input Area */}
            <div style={{ padding: 'var(--space-lg)', borderTop: '1px solid var(--color-glass-border)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 'var(--space-md)' }}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Ask a question about your data..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                        style={{ flex: 1 }}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !input.trim()}
                    >
                        {loading ? <span className="spinner" /> : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QueryChat;
