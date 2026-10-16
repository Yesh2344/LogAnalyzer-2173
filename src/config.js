/**
 * Runtime configuration loader.
 * Reads environment variables defined in .env files.
 * Provides sensible defaults for development.
 */

const config = {
  /** Base URL for the backend API */
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000',
  /** Number of log entries per page */
  pageSize: parseInt(process.env.REACT_APP_LOG_PAGE_SIZE, 10) || 50,
};

export default config;