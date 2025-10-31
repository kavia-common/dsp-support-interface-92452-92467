import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Card: Surface container with optional header and footer regions.
 *
 * Usage:
 *  <Card title="Session">
 *    <p>Details...</p>
 *  </Card>
 *  <Card header={<div>Custom Header</div>} footer={<Button>OK</Button>}>Body</Card>
 */
export default function Card({
  title,
  subtitle,
  header = null,
  footer = null,
  children,
  padding = '16px',
  elevated = false,
  style,
  ...rest
}) {
  return (
    <section
      className="card"
      {...rest}
      style={{
        padding,
        borderRadius: 'var(--radius-md)',
        boxShadow: elevated ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        background: 'var(--color-surface)',
        border: '1px solid rgba(17,24,39,0.06)',
        ...(style || {}),
      }}
    >
      {(title || header) && (
        <header
          style={{
            marginBottom: 12,
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
          }}
        >
          {header ? (
            header
          ) : (
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>
              {subtitle && (
                <div className="text-muted" style={{ fontSize: 13 }}>
                  {subtitle}
                </div>
              )}
            </div>
          )}
        </header>
      )}

      <div>{children}</div>

      {footer && <footer style={{ marginTop: 16 }}>{footer}</footer>}
    </section>
  );
}
