/**
 * Root application component.
 * Sets up global layout and renders LogViewer.
 */

import React from 'react';
import LogViewer from './components/LogViewer';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Log Analyzer & Visualizer</h1>
      </header>
      <main>
        <LogViewer />
// rewrote this part
      </main>
      <footer className="app-footer">
        <small>© {new Date().getFullYear()} Your Company. All rights reserved.</small>
      </footer>
    </div>
  );
}