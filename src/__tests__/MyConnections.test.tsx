import { render, fireEvent } from '@testing-library/react';
import MyConnections, { MyConnectionsProps } from '../components/MyConnections';

describe('MyConnections Component', () => {
  const mockHandleRemoveConnection = jest.fn();

  const defaultProps: MyConnectionsProps = {
    myConnections: [
      { connectionId: 1, id: 101, username: 'JohnDoe' },
      { connectionId: 2, id: 102, username: 'JaneDoe' },
    ],
    handleRemoveConnection: mockHandleRemoveConnection,
  };

  test('renders connections', () => {
    const { getByText } = render(<MyConnections {...defaultProps} />);
    expect(getByText('JohnDoe')).toBeInTheDocument();
    expect(getByText('JaneDoe')).toBeInTheDocument();
  });

  test('calls handleRemoveConnection when clicking remove', () => {
    const { getAllByText } = render(<MyConnections {...defaultProps} />);
    fireEvent.click(getAllByText('Remove')[0]);
    expect(mockHandleRemoveConnection).toHaveBeenCalledWith(1);
  });
});
