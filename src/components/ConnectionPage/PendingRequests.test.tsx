import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PendingRequests, { PendingRequestsProps } from './PendingRequests';


describe('PendingRequests Component', () => {
  const mockHandleAcceptRequest = vi.fn();
  const mockHandleRejectRequest = vi.fn();

  const defaultProps: PendingRequestsProps = {
    pendingRequests: [
      { requestId: 1, id: 101, username: 'JohnDoe' },
      { requestId: 2, id: 102, username: 'JaneDoe' },
    ],
    handleAcceptRequest: mockHandleAcceptRequest,
    handleRejectRequest: mockHandleRejectRequest,
  };

  it('renders pending requests', () => {
    const { getByText } = render(<PendingRequests {...defaultProps} />);
    expect(getByText('JohnDoe')).toBeInTheDocument();
    expect(getByText('JaneDoe')).toBeInTheDocument();
  });

  it('calls handleAcceptRequest when clicking accept', () => {
    const { getAllByText } = render(<PendingRequests {...defaultProps} />);
    fireEvent.click(getAllByText('Accept')[0]);
    expect(mockHandleAcceptRequest).toHaveBeenCalledWith(1);
  });

  it('calls handleRejectRequest when clicking reject', () => {
    const { getAllByText } = render(<PendingRequests {...defaultProps} />);
    fireEvent.click(getAllByText('Reject')[0]);
    expect(mockHandleRejectRequest).toHaveBeenCalledWith(1);
  });
});
