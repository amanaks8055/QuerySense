import React from 'react';
import { isConnected } from '../services/socketService';

const RealtimeIndicator: React.FC = () => {
    const [connected, setConnected] = React.useState(false);

    React.useEffect(() => {
        const checkConnection = () => {
            setConnected(isConnected());
        };

        checkConnection();
        const interval = setInterval(checkConnection, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                padding: 'var(--space-xs) var(--space-md)',
                background: connected
                    ? 'rgba(56, 239, 125, 0.1)'
                    : 'rgba(245, 87, 108, 0.1)',
                border: `1px solid ${connected ? 'rgba(56, 239, 125, 0.3)' : 'rgba(245, 87, 108, 0.3)'
                    }`,
                borderRadius: 'var(--radius-md)',
            }}
        >
            <div
                className={connected ? 'pulse' : ''}
                style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: connected ? 'var(--color-success)' : 'var(--color-warning)',
                }}
            />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                {connected ? 'Live' : 'Offline'}
            </span>
        </div>
    );
};

export default RealtimeIndicator;
