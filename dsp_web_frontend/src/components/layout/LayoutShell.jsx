import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAppDispatch, useAppState } from '../../state/store';
import { uiActions } from '../../state/uiSlice';

/**
 * PUBLIC_INTERFACE
 * LayoutShell provides the dashboard layout with sidebar and topbar.
 */
export default function LayoutShell({ children, onToggleTheme }) {
  const { ui } = useAppState();
  const dispatch = useAppDispatch();

  const collapsed = !!ui.sidebarCollapsed;
  const toggleSidebar = () => dispatch(uiActions.toggleSidebar());

  return (
    <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <Topbar onToggleTheme={onToggleTheme} />
      <main className="main">
        {children}
      </main>
    </div>
  );
}
