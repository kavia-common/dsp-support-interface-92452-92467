import React, { useEffect, useState } from 'react';
import { Card, EmptyState, ErrorBanner, Loader } from '../components/common';
import { getConversations } from '../api/dspApi';

/**
 * PUBLIC_INTERFACE
 * Conversations: List of active conversations fetched via API layer (with mock fallback).
 */
export default function Conversations() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setErr('');
      try {
        const data = await getConversations();
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setErr(e?.message || 'Failed to load conversations.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
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
