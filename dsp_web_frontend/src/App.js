import React from 'react';
import './App.css';
import AppRoutes from './routes';
import { useTheme } from './hooks/useTheme';

/**
 * PUBLIC_INTERFACE
 * App is the root component managing theme and routing shell.
 */
function App() {
  const { toggleTheme } = useTheme();

  return (
    <div className="App">
      <AppRoutes onToggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
