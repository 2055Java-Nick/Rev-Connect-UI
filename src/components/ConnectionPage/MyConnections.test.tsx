import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MyConnections, { MyConnectionsProps } from './MyConnections';


describe('MyConnections Component', () => {
  const mockHandleRemoveConnection = vi.fn();

  const defaultProps: MyConnectionsProps = {
    myConnections: [
      { connectionId: 1, id: 101, username: 'JohnDoe' },
      { connectionId: 2, id: 102, username: 'JaneDoe' },
    ],
    handleRemoveConnection: mockHandleRemoveConnection,
  };

  it('renders connections', () => {
    const { getByText } = render(<MyConnections {...defaultProps} />);
    expect(getByText('JohnDoe')).toBeInTheDocument();
    expect(getByText('JaneDoe')).toBeInTheDocument();
  });

  it('calls handleRemoveConnection when clicking remove', () => {
    const { getAllByText } = render(<MyConnections {...defaultProps} />);
    fireEvent.click(getAllByText('Remove')[0]);
    expect(mockHandleRemoveConnection).toHaveBeenCalledWith(1);
  });
});
