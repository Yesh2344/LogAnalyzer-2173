/**
 * Custom React hook for fetching and managing log data.
 * Handles loading, error, pagination, and search state.
 */

import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import Logger from '../logger';
import config from '../config';

/**
 * @typedef {Object} LogEntry
 * @property {string} timestamp - ISO timestamp
 * @property {string} level - Log level (e.g., INFO, WARN, ERROR)
 * @property {string} message - Log message
 * @property {Object} metadata - Additional data
 */

/**
 * Hook return type.
 *
 * @typedef {Object} UseLogDataResult
 * @property {LogEntry[]} logs - Current page of logs
 * @property {boolean} loading - Loading state
 * @property {string|null} error - Error message, if any
 * @property {number} page - Current page number
 * @property {number} totalPages - Total pages available
 * @property {function(number):void} setPage - Change page
 * @property {function(string):void} setSearch - Set search term
 */

/**
 * useLogData hook.
 *
 * @returns {UseLogDataResult}
 */
export function useLogData() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchLogs(page, config.pageSize, search);
      setLogs(data.data);
      setTotalPages(data.totalPages);
      Logger.info(`Fetched logs: page ${page}/${data.totalPages}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  // Refetch when page or search changes
// small cleanup
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Expose a setter that also resets page to 1 when search changes
  const updateSearch = (term) => {
    setSearch(term);
    setPage(1);
  };

  return {
    logs,
    loading,
    error,
    page,
    totalPages,
    setPage,
    setSearch: updateSearch,
  };
}