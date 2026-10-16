/**
 * API utility module using Axios.
 * Centralizes request handling, error transformation, and logging.
 */

import axios from 'axios';
import config from '../config';
import Logger from '../logger';

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Generic GET request wrapper.
 *
 * @param {string} url - Endpoint path (e.g., '/logs')
 * @param {object} params - Query parameters
 * @returns {Promise<any>} - Resolved response data
 */
export async function get(url, params = {}) {
  try {
    Logger.debug(`GET ${url}`, params);
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error.message || 'Unknown API error';
    Logger.error(`API GET ${url} failed:`, errMsg);
    // Re‑throw a normalized error
    throw new Error(errMsg);
  }
}

/**
 * Exported API methods.
 */
export const api = {
  fetchLogs: (page, size, search) => get('/logs', { page, size, search }),
};