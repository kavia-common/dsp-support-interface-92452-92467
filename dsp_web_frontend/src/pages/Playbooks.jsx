import React, { useEffect, useState } from 'react';
import { Button, Card, EmptyState, ErrorBanner, Loader } from '../components/common';

/**
 * PUBLIC_INTERFACE
 * Playbooks: Placeholder list with actions.
 */
export default function Playbooks() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        setItems([
          { id: 'PB-01', name: 'Reset user session' },
          { id: 'PB-02', name: 'Clear cache and retry' },
        ]);
      } catch (e) {
        setErr('Failed to load playbooks.');
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader label="Loading playbooks..." />;
  if (err) return <ErrorBanner message="Error loading playbooks" description={err} onRetry={() => { setErr(''); setLoading(true); }} />;
  if (!items.length) return <EmptyState title="No Playbooks" description="Create your first automation playbook." action={<Button>Create Playbook</Button>} />;

  return (
    <Card
      title="Playbooks"
      footer={<div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Create Playbook</Button></div>}
    >
      <div style={{ display: 'grid', gap: 8 }}>
        {items.map(p => (
          <div key={p.id} className="card" style={{ padding: 12, display: 'flex', alignItems: 'center' }}>
            <div>
              <strong>{p.name}</strong>
              <div className="text-muted" style={{ fontSize: 13 }}>{p.id}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <Button variant="secondary">Run</Button>
              <Button variant="ghost">Edit</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
