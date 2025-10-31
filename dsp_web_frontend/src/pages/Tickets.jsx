import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, EmptyState, ErrorBanner, Loader } from '../components/common';
import { getTickets } from '../api/dspApi';

/**
 * PUBLIC_INTERFACE
 * Tickets: List of tickets fetched via API layer (with mock fallback).
 */
export default function Tickets() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setErr('');
      try {
        const data = await getTickets();
        if (!cancelled) setTickets(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setErr(e?.message || 'Failed to fetch tickets.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <Loader label="Loading tickets..." />;
  }

  if (err) {
    return <ErrorBanner message="Error loading tickets" description={err} onRetry={() => { setErr(''); setLoading(true); }} />;
  }

  if (!tickets.length) {
    return (
      <EmptyState
        title="No Tickets"
        description="There are no tickets to display yet."
        action={<Button>New Ticket</Button>}
      />
    );
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Card title="Tickets">
        <div style={{ display: 'grid', gap: 8 }}>
          {tickets.map(t => (
            <Link key={t.id} className="card" style={{ padding: 12 }} to={`/tickets/${encodeURIComponent(t.id)}`}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <strong>{t.id}</strong>
                <span className="text-muted">— {t.title}</span>
                <span style={{ marginLeft: 'auto' }} className="text-muted">{t.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
