import React from 'react';
import { motion } from 'framer-motion';

interface ResultsTableProps {
    results: any[];
    executionTime?: number;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, executionTime }) => {
    if (!results || results.length === 0) return null;

    const columns = Object.keys(results[0]);

    return (
        <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-md)',
                }}
            >
                <h3 style={{ margin: 0, fontSize: '1rem' }}>Query Results</h3>
                <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                    {executionTime && (
                        <span className="badge badge-info">
                            ⚡ {executionTime}ms
                        </span>
                    )}
                    <span className="badge badge-success">
                        {results.length} row{results.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column}>
                                    {column.replace(/_/g, ' ').toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((row, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {columns.map((column) => (
                                    <td key={column}>
                                        {row[column] !== null && row[column] !== undefined
                                            ? String(row[column])
                                            : '—'}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default ResultsTable;
