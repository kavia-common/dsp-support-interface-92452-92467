import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { uiInitialState, uiReducer } from './uiSlice';
import { dataInitialState, dataReducer } from './dataSlice';

/**
 * PUBLIC_INTERFACE
 * AppStateContext provides global state (ui, data) using useReducer.
 * DispatchContext exposes the dispatch function for actions from slices.
 */
const AppStateContext = createContext(null);
const DispatchContext = createContext(null);

/**
 * Combine multiple reducers into a single reducer.
 * Each slice reducer is responsible for its own subtree on the state.
 */
function combineReducers(reducersMap) {
  return (state, action) => {
    let hasChanged = false;
    const newState = {};
    for (const [key, reducer] of Object.entries(reducersMap)) {
      const prevForKey = state[key];
      const nextForKey = reducer(prevForKey, action);
      newState[key] = nextForKey;
      hasChanged ||= nextForKey !== prevForKey;
    }
    return hasChanged ? newState : state;
  };
}

const rootInitialState = {
  ui: uiInitialState,
  data: dataInitialState,
};

const rootReducer = combineReducers({
  ui: uiReducer,
  data: dataReducer,
});

/**
 * PUBLIC_INTERFACE
 * AppProviders composes Context providers for the entire app.
 * Wrap your app under this to access global store.
 */
export function AppProviders({ children, initialState = rootInitialState }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const stateValue = useMemo(() => state, [state]);
  const dispatchValue = useMemo(() => dispatch, [dispatch]);

  return (
    <AppStateContext.Provider value={stateValue}>
      <DispatchContext.Provider value={dispatchValue}>
        {children}
      </DispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useAppState returns the global state object { ui, data }.
 */
export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within <AppProviders>');
  }
  return ctx;
}

/**
 * PUBLIC_INTERFACE
 * useAppDispatch returns the dispatch function for actions.
 */
export function useAppDispatch() {
  const ctx = useContext(DispatchContext);
  if (!ctx) {
    throw new Error('useAppDispatch must be used within <AppProviders>');
  }
  return ctx;
}
