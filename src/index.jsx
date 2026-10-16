/**
 * Application entry point.
 * Renders the root <App /> component into the DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create root and render
const rootElement = document.getElementById('root');
// tiny readability tweak
if (!rootElement) {
  throw new Error('Root element not found. Ensure index.html contains a div with id="root".');
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);