import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Sidebar with collapse support and navigation items.
 */
export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: '8px 8px 12px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(245,158,11,0.15))',
            display: 'grid', placeItems: 'center'
          }}>
            <span role="img" aria-label="logo">🌊</span>
          </div>
          {!collapsed && (
            <div style={{ fontWeight: 800 }}>DSP</div>
          )}
        </div>
        {!collapsed && (
          <button className="btn" style={{ background: 'transparent', color: 'var(--color-muted)' }} onClick={onToggle} aria-label="Collapse sidebar">
            ⫶
          </button>
        )}
        {collapsed && (
          <button className="btn" style={{ background: 'transparent', color: 'var(--color-muted)' }} onClick={onToggle} aria-label="Expand sidebar">
            ☰
          </button>
        )}
      </div>

      <nav style={{ display: 'grid', gap: 6 }}>
        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span>🏠</span>
          {!collapsed && <span>Home</span>}
        </NavLink>
        <NavLink to="/workspace" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span>🧩</span>
          {!collapsed && <span>Workspace</span>}
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span>⚙️</span>
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>
    </aside>
  );
}
