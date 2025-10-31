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
