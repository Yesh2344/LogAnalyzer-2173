/**
 * Unit tests for LogViewer component using React Testing Library.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LogViewer from '../components/LogViewer';
import * as apiModule from '../utils/api';

// Mock API response
const mockLogs = {
  data: [
    {
      timestamp: '2024-10-15T12:00:00Z',
      level: 'INFO',
      message: 'User logged in',
      metadata: { userId: 1 },
    },
    {
      timestamp: '2024-10-15T12:05:00Z',
      level: 'ERROR',
      message: 'Database connection failed',
      metadata: { retry: true },
    },
  ],
  page: 1,
  totalPages: 1,
  totalItems: 2,
};

jest.spyOn(apiModule.api, 'fetchLogs').mockImplementation(() => Promise.resolve(mockLogs));

describe('LogViewer', () => {
  test('renders logs after successful fetch', async () => {
    render(<LogViewer />);
    expect(screen.getByText(/Loading logs/i)).toBeInTheDocument();

    // Wait for logs to appear
    await waitFor(() => {
      expect(screen.getByText('User logged in')).toBeInTheDocument();
      expect(screen.getByText('Database connection failed')).toBeInTheDocument();
    });
  });

  test('handles search input', async () => {
    render(<LogViewer />);
    await waitFor(() => screen.getByText('User logged in'));

    const input = screen.getByLabelText(/Search logs/i);
    fireEvent.change(input, { target: { value: 'Database' } });
    fireEvent.submit(input.closest('form'));

    // Ensure fetchLogs called with search term
    await waitFor(() => {
      expect(apiModule.api.fetchLogs).toHaveBeenCalledWith(1, expect.any(Number), 'Database');
    });
  });

  test('displays error message on API failure', async () => {
    apiModule.api.fetchLogs.mockRejectedValueOnce(new Error('Network error'));

    render(<LogViewer />);
    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });
});