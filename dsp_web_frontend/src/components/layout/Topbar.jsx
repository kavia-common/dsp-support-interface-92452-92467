import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Topbar shows the page title and a theme toggle placeholder.
 */
export default function Topbar({ title = 'DSP Support', onToggleTheme }) {
  return (
    <header className="topbar soft-gradient">
      <h1 style={{ fontSize: 16, margin: 0, fontWeight: 800, color: 'var(--color-text)' }}>
        {title}
      </h1>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button type="button" className="btn btn-secondary" onClick={onToggleTheme} aria-label="Toggle theme">
          Theme
        </button>
      </div>
    </header>
  );
}
