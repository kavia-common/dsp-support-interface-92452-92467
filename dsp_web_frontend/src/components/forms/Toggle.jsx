import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Toggle: Accessible switch component bound to a boolean value.
 *
 * Usage:
 *  <Toggle checked={enabled} onChange={setEnabled} label="Enable sync" />
 */
export default function Toggle({
  id,
  checked,
  onChange,
  label,
  helpText,
  disabled = false,
  size = 'md', // sm | md
}) {
  const inputId = id || `tgl-${Math.random().toString(36).slice(2)}`;
  const sizes = {
    sm: { w: 34, h: 20, knob: 14, pad: 3 },
    md: { w: 44, h: 26, knob: 20, pad: 3 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div style={{ display: 'grid', gap: 6 }}>
      {label && (
        <label htmlFor={inputId} style={{ fontWeight: 600, fontSize: 14 }}>
          {label}
        </label>
      )}

      <button
        id={inputId}
        type="button"
        role="switch"
        aria-checked={!!checked}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange?.(!checked);
          }
          if (e.key === 'ArrowLeft') onChange?.(false);
          if (e.key === 'ArrowRight') onChange?.(true);
        }}
        className="toggle"
        style={{
          position: 'relative',
          width: s.w,
          height: s.h,
          borderRadius: s.h / 2,
          background: checked ? 'var(--color-primary)' : 'rgba(17,24,39,0.15)',
          border: '1px solid rgba(17,24,39,0.1)',
          transition: 'background 0.2s ease, box-shadow 0.2s ease',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: s.pad,
            left: checked ? s.w - s.knob - s.pad - 2 : s.pad,
            width: s.knob,
            height: s.knob,
            borderRadius: '50%',
            background: 'white',
            boxShadow: 'var(--shadow-sm)',
            transition: 'left 0.2s ease',
          }}
        />
        <style>{`
          .toggle:focus-visible {
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 30%, transparent);
          }
        `}</style>
      </button>

      {helpText && <div className="text-muted" style={{ fontSize: 12 }}>{helpText}</div>}
    </div>
  );
}
