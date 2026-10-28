import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure any residual dark mode class or storage from previous sessions is removed
document.documentElement.classList.remove('dark');
try {
  localStorage.removeItem('theme');
} catch {
  // Ignore in case storage is restricted
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
