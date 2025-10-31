import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, ErrorBanner, Loader } from '../components/common';

/**
 * PUBLIC_INTERFACE
 * TicketDetail: Detail view for a ticket id with placeholder data.
 */
export default function TicketDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        // Placeholder ticket
        setTicket({
          id,
          title: 'Sample ticket',
          status: 'Open',
          description: 'Customer reports an issue with the system. This is placeholder content.',
        });
      } catch (e) {
        setErr('Failed to fetch ticket.');
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(t);
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
