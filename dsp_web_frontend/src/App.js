import React, { useState, useEffect } from 'react';
import './App.css';
import AppRoutes from './routes';

/**
 * PUBLIC_INTERFACE
 * App is the root component managing theme and routing shell.
 */
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="App">
      <AppRoutes onToggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
