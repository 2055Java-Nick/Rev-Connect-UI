import { render, fireEvent } from '@testing-library/react';
import SearchBar, { SearchBarProps } from '../components/SearchBar';

describe('SearchBar Component', () => {
  const mockHandleSearchChange = jest.fn();
  const mockHandleSendConnectionRequest = jest.fn();

  const defaultProps: SearchBarProps = {
    searchQuery: '',
    handleSearchChange: mockHandleSearchChange,
    searchResults: [],
    handleSendConnectionRequest: mockHandleSendConnectionRequest,
  };

  test('renders search input', () => {
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);
    expect(getByPlaceholderText('Search users...')).toBeInTheDocument();
  });

  test('calls handleSearchChange on input change', () => {
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);
    fireEvent.change(getByPlaceholderText('Search users...'), { target: { value: 'John' } });
    expect(mockHandleSearchChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
