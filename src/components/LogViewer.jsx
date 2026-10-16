/**
 * LogViewer component – displays logs with pagination, search, and filtering.
 */

import React, { useState } from 'react';
import { useLogData } from '../hooks/useLogData';
import './LogViewer.css';

/**
 * Render a single log entry row.
 *
 * @param {Object} props
 * @param {import('../hooks/useLogData').LogEntry} props.entry
 * @returns {JSX.Element}
 */
function LogRow({ entry }) {
  const { timestamp, level, message, metadata } = entry;
  return (
    <tr className={`log-row level-${level.toLowerCase()}`}>
      <td>{new Date(timestamp).toLocaleString()}</td>
      <td>{level}</td>
      <td>{message}</td>
      <td>{JSON.stringify(metadata)}</td>
    </tr>
  );
}

/**
 * Main LogViewer component.
 *
 * @returns {JSX.Element}
 */
export default function LogViewer() {
  const {
    logs,
    loading,
    error,
    page,
    totalPages,
    setPage,
    setSearch,
  } = useLogData();

  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <section className="log-viewer">
      <h2>Server Logs</h2>

      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search logs..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Search logs"
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>

      {loading && <p className="status">Loading logs...</p>}
      {error && <p className="status error">Error: {error}</p>}

      {!loading && !error && logs.length === 0 && <p className="status">No logs found.</p>}

      {!loading && !error && logs.length > 0 && (
        <table className="log-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Level</th>
              <th>Message</th>
              <th>Metadata</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((entry) => (
              <LogRow key={entry.timestamp + entry.message} entry={entry} />
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1 || loading}>Prev</button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages || loading}>Next</button>
      </div>
    </section>
  );
}