import React from 'react';
import { motion } from 'framer-motion';

interface InsightsPanelProps {
    insights: string;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
    if (!insights) return null;

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
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    marginBottom: 'var(--space-md)',
                }}
            >
                <span style={{ fontSize: '1.5rem' }}>🧠</span>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>AI-Generated Insights</h3>
            </div>

            <div
                style={{
                    padding: 'var(--space-lg)',
                    background: 'var(--gradient-accent)',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                }}
            >
                <p
                    style={{
                        margin: 0,
                        fontSize: '0.875rem',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {insights}
                </p>
            </div>
        </motion.div>
    );
};

export default InsightsPanel;
