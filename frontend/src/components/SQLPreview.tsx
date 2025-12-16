import React from 'react';
import { motion } from 'framer-motion';

interface SQLPreviewProps {
    sql: string;
    explanation: string;
}

const SQLPreview: React.FC<SQLPreviewProps> = ({ sql, explanation }) => {
    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(sql);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!sql) return null;

    return (
        <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-md)',
                }}
            >
                <h3 style={{ margin: 0, fontSize: '1rem' }}>Generated SQL Query</h3>
                <button
                    className="btn btn-sm btn-secondary"
                    onClick={copyToClipboard}
                >
                    {copied ? '✓ Copied' : '📋 Copy'}
                </button>
            </div>

            {/* SQL Code Block */}
            <div className="code-block">
                <code>{sql}</code>
            </div>

            {/* Explanation */}
            {explanation && (
                <div
                    style={{
                        marginTop: 'var(--space-md)',
                        padding: 'var(--space-md)',
                        background: 'rgba(79, 172, 254, 0.05)',
                        border: '1px solid rgba(79, 172, 254, 0.2)',
                        borderRadius: 'var(--radius-sm)',
                    }}
                >
                    <div
                        style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--color-info)',
                            marginBottom: 'var(--space-xs)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Explanation
                    </div>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '0.875rem',
                            lineHeight: 1.6,
                            color: 'var(--color-text-secondary)',
                        }}
                    >
                        {explanation}
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default SQLPreview;
