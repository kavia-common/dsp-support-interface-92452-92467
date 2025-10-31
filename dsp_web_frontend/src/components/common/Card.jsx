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
        ...rest.style,
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

      {footer && (
        <footer style={{ marginTop: 16 }}>
          {footer}
        </footer>
      )}
    </section>
  );
}
```

Explanation: Create Loader component for inline/spinner and fullscreen modes with ARIA attributes
````write file="/home/kavia/workspace/code-generation/dsp-support-interface-92452-92467/dsp_web_frontend/src/components/common/Loader.jsx"
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
```

Explanation: Create ErrorBanner component for prominent error messages with dismiss support
````write file="/home/kavia/workspace/code-generation/dsp-support-interface-92452-92467/dsp_web_frontend/src/components/common/ErrorBanner.jsx"
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
```

Explanation: Create EmptyState component for empty screens with icon, title, description, and action
````write file="/home/kavia/workspace/code-generation/dsp-support-interface-92452-92467/dsp_web_frontend/src/components/common/EmptyState.jsx"
import React from 'react';

/**
 * PUBLIC_INTERFACE
 * EmptyState: Friendly placeholder for empty lists or screens.
 *
 * Usage:
 *  <EmptyState title="No Tickets" description="There are no open tickets." action={<Button>New Ticket</Button>} />
 */
export default function EmptyState({ icon = '📭', title, description, action = null }) {
  return (
    <div
      className="card"
      style={{
        padding: 24,
        textAlign: 'center',
        display: 'grid',
        placeItems: 'center',
        gap: 8,
      }}
    >
      <div aria-hidden="true" style={{ fontSize: 36, lineHeight: '36px' }}>
        {icon}
      </div>
      <div style={{ fontWeight: 700 }}>{title}</div>
      {description && <div className="text-muted" style={{ fontSize: 14 }}>{description}</div>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}
```

Explanation: Create Modal component with focus trap, ESC/overlay close, and ARIA attributes
````write file="/home/kavia/workspace/code-generation/dsp-support-interface-92452-92467/dsp_web_frontend/src/components/common/Modal.jsx"
import React, { useEffect, useRef } from 'react';
import Button from './Button';

/**
 * PUBLIC_INTERFACE
 * Modal: Accessible dialog with overlay, title, and close controls.
 *
 * Usage:
 *  <Modal open={open} onClose={() => setOpen(false)} title="Preferences">
 *    <p>Content</p>
 *  </Modal>
 */
export default function Modal({ open, onClose, title, children, footer = null }) {
  const dialogRef = useRef(null);
  const firstFocusable = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && open) {
        onClose?.();
      }
      if (e.key === 'Tab' && open) {
        // Basic focus trap within modal
        const focusable = dialogRef.current?.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      // Focus the first focusable or the dialog itself
      const el =
        dialogRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) || dialogRef.current;
      firstFocusable.current = el;
      setTimeout(() => el?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      onMouseDown={(e) => {
        // click outside dialog to close
        if (e.target === e.currentTarget) onClose?.();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 1100,
        padding: 16,
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="surface"
        style={{
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(17,24,39,0.08)',
          minWidth: 320,
          maxWidth: 640,
          width: '100%',
          outline: 'none',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 12px 0 12px',
          }}
        >
          <h2 id="modal-title" style={{ fontSize: 16, margin: 0, fontWeight: 800 }}>
            {title}
          </h2>
          <Button
            aria-label="Close"
            variant="ghost"
            size="sm"
            onClick={onClose}
            style={{ marginLeft: 'auto' }}
          >
            ✕
          </Button>
        </header>

        <div style={{ padding: 12 }}>
          {children}
        </div>

        <footer style={{ padding: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          {footer ?? (
            <>
              <Button variant="ghost" onClick={onClose}>Close</Button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}
```

Explanation: Create TextField component with label, help, error, and accessible descriptions
````write file="/home/kavia/workspace/code-generation/dsp-support-interface-92452-92467/dsp_web_frontend/src/components/forms/TextField.jsx"
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
```

Explanation: Create Select component with label, help/error, keyboard accessible
````write file="/home/kavia/workspace/code-generation/dsp-support-interface-92452-92467/dsp_web_frontend/src/components/forms/Select.jsx"
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
```

Explanation: Create TextArea component with label, help/error and autosize option
````write file="/home/kavia/workspace/code-generation/dsp-support-interface-92452-92467/dsp_web_frontend/src/components/forms/TextArea.jsx"
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
```

Explanation: Create Toggle (switch) component with accessible keyboard and ARIA
````write file="/home/kavia/workspace/code-generation/dsp-support-interface-92452-92467/dsp_web_frontend/src/components/forms/Toggle.jsx"
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
```

Explanation: Create index barrel for common components
````write file="/home/kavia/workspace/code-generation/dsp-support-interface-92452-92467/dsp_web_frontend/src/components/common/index.js"
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Loader } from './Loader';
export { default as ErrorBanner } from './ErrorBanner';
export { default as EmptyState } from './EmptyState';
export { default as Modal } from './Modal';
