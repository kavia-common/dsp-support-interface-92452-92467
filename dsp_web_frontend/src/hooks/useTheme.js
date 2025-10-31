import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppState } from '../state/store';
import { uiActions } from '../state/uiSlice';

/**
 * PUBLIC_INTERFACE
 * useTheme exposes current theme and helpers to toggle/set it.
 * It also syncs the data-theme attribute on <html> and persists preference.
 */
export function useTheme() {
  const { ui } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ui?.theme) return;
    try {
      document.documentElement.setAttribute('data-theme', ui.theme);
    } catch {}
  }, [ui?.theme]);

  const setTheme = useCallback(
    (theme) => dispatch(uiActions.setTheme(theme)),
    [dispatch]
  );
  const toggleTheme = useCallback(
    () => dispatch(uiActions.toggleTheme()),
    [dispatch]
  );

  return {
    theme: ui?.theme || 'light',
    setTheme,
    toggleTheme,
  };
}
