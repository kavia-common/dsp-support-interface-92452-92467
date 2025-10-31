import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, ErrorBanner, Loader } from '../components/common';
import { getTicket } from '../api/dspApi';

/**
 * PUBLIC_INTERFACE
 * TicketDetail: Detail view for a ticket id loaded via API layer (with mock fallback).
 */
export default function TicketDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setErr('');
      try {
        const data = await getTicket(id);
        if (!cancelled) setTicket(data || null);
      } catch (e) {
        if (!cancelled) setErr(e?.message || 'Failed to fetch ticket.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <Loader label="Loading ticket..." />;

  if (err) return <ErrorBanner message="Error loading ticket" description={err} onRetry={() => { setErr(''); setLoading(true); }} />;

  if (!ticket) return <ErrorBanner message="Ticket not found" />;

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link to="/tickets" className="btn btn-ghost" style={{ textDecoration: 'none' }}>← Back</Link>
        <div style={{ marginLeft: 'auto' }}>
          <Button variant="secondary">Assign</Button>
        </div>
      </div>
      <Card title={`${ticket.id} — ${ticket.title}`} subtitle={ticket.status}>
        <p className="text-muted">{ticket.description}</p>
      </Card>
    </div>
  );
}
