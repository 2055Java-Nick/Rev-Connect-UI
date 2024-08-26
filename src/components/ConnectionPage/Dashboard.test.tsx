import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../components/Dashboard';
import * as api from '../../services/api/connections.service';

describe('Dashboard Component', () => {
  it('renders header and footer', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('Connections Dashboard')).toBeInTheDocument();
    expect(getByText('© 2024 Revature. All rights reserved.')).toBeInTheDocument();
  });

  it('fetches and displays pending requests', async () => {
    const mockPendingRequests = [
      { requestId: 1, id: 101, username: 'JohnDoe' },
      { requestId: 2, id: 102, username: 'JaneDoe' },
    ];

    vi.spyOn(api, 'getPendingConnectionRequests').mockResolvedValue(mockPendingRequests);

    const { getByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByText('JohnDoe')).toBeInTheDocument();
      expect(getByText('JaneDoe')).toBeInTheDocument();
    });
  });

  it('handles search input change and fetches search results', async () => {
    const mockSearchResults = [{ id: 101, username: 'JohnDoe' }];

    vi.spyOn(api, 'searchUser').mockResolvedValue(mockSearchResults);

    const { getByPlaceholderText, getByText } = render(<Dashboard />);
    const input = getByPlaceholderText('Search users...');

    fireEvent.change(input, { target: { value: 'John' } });

    await waitFor(() => {
      expect(getByText('JohnDoe')).toBeInTheDocument();
    });
  });

  it('calls handleSendConnectionRequest on sending a connection request', async () => {
    vi.spyOn(api, 'sendConnectionRequest').mockResolvedValue(undefined);

    const { getByText, getByPlaceholderText } = render(<Dashboard />);
    const input = getByPlaceholderText('Search users...');

    fireEvent.change(input, { target: { value: 'John' } });
    await waitFor(() => {
      fireEvent.click(getByText('JohnDoe'));
    });

    expect(api.sendConnectionRequest).toHaveBeenCalled();
  });
});
