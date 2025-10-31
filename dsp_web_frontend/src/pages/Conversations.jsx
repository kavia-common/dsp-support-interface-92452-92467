import React, { useEffect, useState } from 'react';
import { Card, EmptyState, ErrorBanner, Loader } from '../components/common';

/**
 * PUBLIC_INTERFACE
 * Conversations: Placeholder list of active conversations.
 */
export default function Conversations() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        setItems([
          { id: 'C-1', subject: 'Follow-up on ticket TCK-101', participants: 3 },
        ]);
      } catch (e) {
        setErr('Failed to load conversations.');
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader label="Loading conversations..." />;
  if (err) return <ErrorBanner message="Error loading conversations" description={err} onRetry={() => { setErr(''); setLoading(true); }} />;
  if (!items.length) return <EmptyState title="No Conversations" description="Start a new conversation from a ticket." />;

  return (
    <Card title="Conversations">
      <div style={{ display: 'grid', gap: 8 }}>
        {items.map(c => (
          <div key={c.id} className="card" style={{ padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <strong>{c.id}</strong>
              <span className="text-muted">— {c.subject}</span>
              <span style={{ marginLeft: 'auto' }} className="text-muted">{c.participants} participants</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
