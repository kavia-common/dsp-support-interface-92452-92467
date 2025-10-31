import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, EmptyState, ErrorBanner, Loader } from '../components/common';

/**
 * PUBLIC_INTERFACE
 * Tickets: List of tickets with placeholder loading and error handling.
 */
export default function Tickets() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        // Placeholder data
        setTickets([
          { id: 'TCK-101', title: 'Login issues for user A', status: 'Open' },
          { id: 'TCK-102', title: 'Payment failure on checkout', status: 'Investigating' },
        ]);
      } catch (e) {
        setErr('Failed to fetch tickets.');
      } finally {
        setLoading(false);
      }
    }, 600);
    return () => clearTimeout(t);
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
