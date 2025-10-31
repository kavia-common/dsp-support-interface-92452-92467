import React, { forwardRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * Select: Labeled native select with help and error support.
 *
 * Usage:
 *  <Select label="Priority" options={[{label:'Low',value:'low'}]} value={...} onChange={...} />
 */
const Select = forwardRef(function Select(
  {
    id,
    label,
    options = [],
    value,
    onChange,
    placeholder = 'Select…',
    helpText,
    error,
    required = false,
    disabled = false,
    fullWidth = true,
    ...rest
  },
  ref
) {
  const inputId = id || `sel-${Math.random().toString(36).slice(2)}`;
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
      <select
        ref={ref}
        id={inputId}
        value={value}
        onChange={onChange}
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
          appearance: 'none',
          backgroundImage:
            'linear-gradient(45deg, transparent 50%, var(--color-muted) 50%), linear-gradient(135deg, var(--color-muted) 50%, transparent 50%)',
          backgroundPosition: 'calc(100% - 20px) 50%, calc(100% - 15px) 50%',
          backgroundSize: '5px 5px, 5px 5px',
          backgroundRepeat: 'no-repeat',
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
      >
        {placeholder && <option value="" disabled hidden>{placeholder}</option>}
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
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

export default Select;
