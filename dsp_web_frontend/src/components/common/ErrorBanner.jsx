import React from 'react';
import Button from './Button';

/**
 * PUBLIC_INTERFACE
 * ErrorBanner: Prominent error message with optional action and dismiss.
 *
 * Usage:
 *  <ErrorBanner message="Failed to fetch" />
 *  <ErrorBanner message="Login failed" onRetry={() => ...} />
 */
export default function ErrorBanner({
  message,
  description,
  onRetry,
  onDismiss,
  role = 'alert',
}) {
  return (
    <div
      role={role}
      aria-live="assertive"
      className="error-banner"
      style={{
        borderRadius: 'var(--radius-md)',
        padding: 12,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        background: 'color-mix(in srgb, var(--color-error) 12%, white)',
        border: '1px solid color-mix(in srgb, var(--color-error) 30%, white)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 18, lineHeight: '22px' }}>⚠️</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700 }}>{message}</div>
        {description && <div className="text-muted" style={{ fontSize: 14 }}>{description}</div>}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {onRetry && (
          <Button variant="ghost" size="sm" onClick={onRetry} aria-label="Retry">
            Retry
          </Button>
        )}
        {onDismiss && (
          <Button variant="ghost" size="sm" onClick={onDismiss} aria-label="Dismiss">
            Dismiss
          </Button>
        )}
      </div>
    </div>
  );
}
