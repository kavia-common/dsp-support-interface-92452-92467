import React from 'react';

/**
 * PUBLIC_INTERFACE
 * AppProviders wraps the application to provide theme and future context providers.
 * For now, it simply renders children; theme is handled via CSS variables and Topbar toggle placeholder.
 */
export function AppProviders({ children }) {
  return (
    <>
      {children}
    </>
  );
}
