const THEME_STORAGE_KEY = 'dsp_theme_pref';

/**
 * Try reading persisted theme from localStorage first, then sessionStorage.
 * Defaults to 'light' if none found.
 */
function readPersistedTheme() {
  try {
    const ls = localStorage.getItem(THEME_STORAGE_KEY);
    if (ls) return ls;
  } catch {}
  try {
    const ss = sessionStorage.getItem(THEME_STORAGE_KEY);
    if (ss) return ss;
  } catch {}
  return 'light';
}

export const uiInitialState = {
  theme: readPersistedTheme(), // 'light' | 'dark'
  sidebarCollapsed: false,
  toasts: [], // array of { id, message, type, timeout }
};

// Action type constants
const SET_THEME = 'ui/setTheme';
const TOGGLE_THEME = 'ui/toggleTheme';
const SET_SIDEBAR = 'ui/setSidebarCollapsed';
const TOGGLE_SIDEBAR = 'ui/toggleSidebar';
const ADD_TOAST = 'ui/addToast';
const REMOVE_TOAST = 'ui/removeToast';

export const uiActions = {
  setTheme: (theme) => ({ type: SET_THEME, payload: theme }),
  toggleTheme: () => ({ type: TOGGLE_THEME }),
  setSidebarCollapsed: (collapsed) => ({ type: SET_SIDEBAR, payload: collapsed }),
  toggleSidebar: () => ({ type: TOGGLE_SIDEBAR }),
  addToast: (toast) => ({ type: ADD_TOAST, payload: toast }),
  removeToast: (id) => ({ type: REMOVE_TOAST, payload: id }),
};

/**
 * uiReducer handles UI-related state updates.
 */
export function uiReducer(state = uiInitialState, action) {
  switch (action.type) {
    case SET_THEME: {
      const theme = action.payload === 'dark' ? 'dark' : 'light';
      persistTheme(theme);
      setDomTheme(theme);
      return { ...state, theme };
    }
    case TOGGLE_THEME: {
      const theme = state.theme === 'light' ? 'dark' : 'light';
      persistTheme(theme);
      setDomTheme(theme);
      return { ...state, theme };
    }
    case SET_SIDEBAR:
      return { ...state, sidebarCollapsed: !!action.payload };
    case TOGGLE_SIDEBAR:
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case ADD_TOAST: {
      const toast = action.payload || {};
      const id = toast.id || `t_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      return { ...state, toasts: [...state.toasts, { id, type: 'info', ...toast }] };
    }
    case REMOVE_TOAST:
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
    default:
      return state;
  }
}

// Sync helpers
function setDomTheme(theme) {
  try {
    document.documentElement.setAttribute('data-theme', theme);
  } catch {}
}
function persistTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
  try {
    sessionStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}
