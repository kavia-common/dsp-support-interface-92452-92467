import React from 'react';
import { Card } from '../components/common';

/**
 * PUBLIC_INTERFACE
 * Dashboard: Landing page with quick stats/placeholder.
 */
export default function Dashboard() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card title="Welcome to DSP Dashboard" subtitle="Overview">
        <p className="text-muted">
          Use the sidebar to navigate Tickets, Conversations, Playbooks, and Settings.
        </p>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        <Card title="Open Tickets">
          <div className="text-muted">0</div>
        </Card>
        <Card title="Active Conversations">
          <div className="text-muted">0</div>
        </Card>
        <Card title="Playbooks">
          <div className="text-muted">0</div>
        </Card>
      </div>
    </div>
  );
}
