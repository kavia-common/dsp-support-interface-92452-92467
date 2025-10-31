import React from 'react';

/**
 * PUBLIC_INTERFACE
 * EmptyState: Friendly placeholder for empty lists or screens.
 *
 * Usage:
 *  <EmptyState title="No Tickets" description="There are no open tickets." action={<Button>New Ticket</Button>} />
 */
export default function EmptyState({ icon = '📭', title, description, action = null }) {
  return (
    <div
      className="card"
      style={{
        padding: 24,
        textAlign: 'center',
        display: 'grid',
        placeItems: 'center',
        gap: 8,
      }}
    >
      <div aria-hidden="true" style={{ fontSize: 36, lineHeight: '36px' }}>
        {icon}
      </div>
      <div style={{ fontWeight: 700 }}>{title}</div>
      {description && <div className="text-muted" style={{ fontSize: 14 }}>{description}</div>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}
