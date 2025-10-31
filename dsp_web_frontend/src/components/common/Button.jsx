import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Button: Theme-aware button component supporting variants, sizes, loading state, icons, and accessibility attributes.
 *
 * Usage:
 *  <Button variant="primary" onClick={...}>Save</Button>
 *  <Button variant="secondary" size="sm" leadingIcon="⭐">Star</Button>
 *  <Button variant="ghost" loading>Loading</Button>
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary', // primary | secondary | ghost | danger
  size = 'md', // sm | md | lg
  loading = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  fullWidth = false,
  ariaLabel,
  onClick,
  ...rest
}) {
  const isDisabled = disabled || loading;

  const className = [
    'btn',
    variantClass(variant),
    sizeClass(size),
    fullWidth ? 'btn-block' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={className}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      {...rest}
      style={{
        // Inline fallbacks in case theme.css is missing some styles
        ...rest.style,
        width: fullWidth ? '100%' : rest.style?.width,
        outline: 'none',
      }}
      onKeyDown={(e) => {
        // Space key should also "click" buttons for keyboard users
        if (e.key === ' ' && !isDisabled) {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="btn-spinner"
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.5)',
            borderTopColor: 'transparent',
            display: 'inline-block',
            marginRight: children ? 8 : 0,
            animation: 'spin 0.8s linear infinite',
          }}
        />
      )}
      {leadingIcon && (
        <span aria-hidden="true" style={{ display: 'inline-flex', marginRight: 8 }}>
          {leadingIcon}
        </span>
      )}
      <span>{children}</span>
      {trailingIcon && (
        <span aria-hidden="true" style={{ display: 'inline-flex', marginLeft: 8 }}>
          {trailingIcon}
        </span>
      )}

      {/* Button-specific focus-visible */}
      <style>{`
        .btn:focus-visible {
          outline: 2px solid color-mix(in srgb, var(--color-primary) 60%, white);
          outline-offset: 2px;
        }
        .btn.btn-danger {
          background: var(--color-error);
          color: white;
        }
        .btn.btn-ghost {
          background: transparent;
          color: var(--color-text);
          border: 1px solid rgba(17,24,39,0.08);
        }
        .btn.btn-ghost:hover {
          background: rgba(37,99,235,0.06);
        }
        .btn.btn-sm { padding: 0.4rem 0.75rem; font-size: 0.9rem; border-radius: var(--radius-sm); }
        .btn.btn-md { padding: 0.6rem 1rem; font-size: 1rem; border-radius: var(--radius-sm); }
        .btn.btn-lg { padding: 0.8rem 1.1rem; font-size: 1.05rem; border-radius: var(--radius-md); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
}

function variantClass(variant) {
  switch (variant) {
    case 'primary':
      return 'btn-primary';
    case 'secondary':
      return 'btn-secondary';
    case 'danger':
      return 'btn-danger';
    case 'ghost':
      return 'btn-ghost';
    default:
      return 'btn-primary';
  }
}
function sizeClass(size) {
  switch (size) {
    case 'sm': return 'btn-sm';
    case 'lg': return 'btn-lg';
    default: return 'btn-md';
  }
}
