import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Loader: Accessible loading indicator with optional label and fullscreen overlay.
 *
 * Usage:
 *  <Loader /> // inline spinner
 *  <Loader label="Fetching data..." />
 *  <Loader fullscreen />
 */
export default function Loader({ label = 'Loading...', size = 18, fullscreen = false }) {
  const spinner = (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '2px solid rgba(17,24,39,0.12)',
        borderTopColor: 'var(--color-primary)',
        display: 'inline-block',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );

  const content = (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
    >
      {spinner}
      {label && <span className="text-muted" style={{ fontSize: 14 }}>{label}</span>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!fullscreen) return content;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.35)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="surface"
        style={{
          padding: 16,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          borderRadius: 'var(--radius-md)',
        }}
      >
        {content}
      </div>
    </div>
  );
}
