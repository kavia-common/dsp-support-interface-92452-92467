import React, { forwardRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * TextField: Labeled text input with help and error support.
 *
 * Usage:
 *  <TextField label="Email" placeholder="you@acme.com" value={...} onChange={...} />
 */
const TextField = forwardRef(function TextField(
  {
    id,
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
    helpText,
    error,
    required = false,
    disabled = false,
    fullWidth = true,
    ...rest
  },
  ref
) {
  const inputId = id || `tf-${Math.random().toString(36).slice(2)}`;
  const helpId = helpText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div style={{ width: fullWidth ? '100%' : undefined }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}
        >
          {label} {required ? <span className="text-muted" aria-hidden="true">*</span> : null}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-describedby={[helpId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={!!error || undefined}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          border: `1px solid ${error ? 'color-mix(in srgb, var(--color-error) 50%, white)' : 'rgba(17,24,39,0.12)'}`,
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          outline: 'none',
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--color-primary) 30%, transparent)';
          e.currentTarget.style.borderColor = 'var(--color-primary)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = error ? 'color-mix(in srgb, var(--color-error) 50%, white)' : 'rgba(17,24,39,0.12)';
        }}
        {...rest}
      />
      {helpText && !error && (
        <div id={helpId} className="text-muted" style={{ fontSize: 12, marginTop: 6 }}>
          {helpText}
        </div>
      )}
      {error && (
        <div id={errorId} style={{ fontSize: 12, marginTop: 6, color: 'var(--color-error)' }}>
          {error}
        </div>
      )}
    </div>
  );
});

export default TextField;
