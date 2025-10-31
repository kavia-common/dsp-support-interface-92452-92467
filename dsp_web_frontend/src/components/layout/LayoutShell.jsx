import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * PUBLIC_INTERFACE
 * LayoutShell provides the dashboard layout with sidebar and topbar.
 */
export default function LayoutShell({ children, onToggleTheme }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <Topbar onToggleTheme={onToggleTheme} />
      <main className="main">
        {children}
      </main>
    </div>
  );
}
