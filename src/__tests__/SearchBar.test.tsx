import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar, { SearchBarProps } from '../components/SearchBar';

describe('SearchBar Component', () => {
  const mockHandleSearchChange = vi.fn();
  const mockHandleSendConnectionRequest = vi.fn();

  const defaultProps: SearchBarProps = {
    searchQuery: '',
    handleSearchChange: mockHandleSearchChange,
    searchResults: [],
    handleSendConnectionRequest: mockHandleSendConnectionRequest,
  };

  it('renders search input', () => {
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);
    expect(getByPlaceholderText('Search users...')).toBeInTheDocument();
  });

  it('calls handleSearchChange on input change', () => {
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);
    fireEvent.change(getByPlaceholderText('Search users...'), { target: { value: 'John' } });
    expect(mockHandleSearchChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
