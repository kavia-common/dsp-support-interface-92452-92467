import React from 'react';
import { EmptyState } from '../components/common';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NotFound: 404 page.
 */
export default function NotFound() {
  return (
    <div style={{ maxWidth: 560, marginInline: 'auto' }}>
      <EmptyState
        icon="🔎"
        title="Page not found"
        description={<span>The page you are looking for does not exist. <Link to="/" style={{ color: 'var(--color-primary)' }}>Go home</Link>.</span>}
      />
    </div>
  );
}
