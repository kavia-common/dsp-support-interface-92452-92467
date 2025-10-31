import React, { forwardRef, useEffect, useRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * TextArea: Labeled textarea with help, error, and optional autosize behavior.
 *
 * Usage:
 *  <TextArea label="Notes" rows={4} value={...} onChange={...} autosize />
 */
const TextArea = forwardRef(function TextArea(
  {
    id,
    label,
    value,
    onChange,
    placeholder,
    helpText,
    error,
    required = false,
    disabled = false,
    rows = 4,
    autosize = false,
    fullWidth = true,
    ...rest
  },
  ref
) {
  const inputId = id || `ta-${Math.random().toString(36).slice(2)}`;
  const helpId = helpText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const innerRef = useRef(null);

  useEffect(() => {
    if (!autosize || !innerRef.current) return;
    const el = innerRef.current;
    const resize = () => {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 400)}px`;
    };
    resize();
  }, [value, autosize]);

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
      <textarea
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
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
          resize: autosize ? 'none' : 'vertical',
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

export default TextArea;
