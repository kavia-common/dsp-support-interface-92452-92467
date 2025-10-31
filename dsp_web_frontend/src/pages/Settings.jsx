import React from 'react';
import { Card, Toggle } from '../components/common';
import { TextField } from '../components/forms';

/**
 * PUBLIC_INTERFACE
 * Settings: Placeholder settings with form controls.
 */
export default function Settings() {
  const [enabled, setEnabled] = React.useState(true);
  const [email, setEmail] = React.useState('');

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card title="Preferences">
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gap: 6 }}>
            <label style={{ fontWeight: 700 }}>Notifications</label>
            <Toggle checked={enabled} onChange={setEnabled} helpText="Enable email notifications on ticket updates." />
          </div>
          <TextField label="Support Email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </Card>
    </div>
  );
}
