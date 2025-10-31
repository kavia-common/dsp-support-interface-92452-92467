import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutShell from '../components/layout/LayoutShell';

function HomePage() {
  return (
    <div className="card" style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Welcome</h2>
      <p className="text-muted">Ocean Professional theme is active.</p>
    </div>
  );
}

function WorkspacePage() {
  return (
    <div className="card" style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Workspace</h2>
      <p className="text-muted">This is where DSP interactions will live.</p>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="card" style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Settings</h2>
      <p className="text-muted">Configure application preferences.</p>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * AppRoutes defines all application routes and wraps them with the dashboard layout.
 */
export default function AppRoutes({ onToggleTheme }) {
  return (
    <LayoutShell onToggleTheme={onToggleTheme}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </LayoutShell>
  );
}
