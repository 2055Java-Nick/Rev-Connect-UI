import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import BusinessProfile from './BusinessProfile';
import { useUser } from '../Context/UserContext';
import '@testing-library/jest-dom';
import axios from 'axios';

vi.mock('../Context/UserContext', () => ({
  useUser: () => ({
    user: { id: 1 },
    setUser: vi.fn(),
  }),
}));

describe('BusinessProfile Component', () => {
  it('should render the profile information', () => {
    render(<BusinessProfile />);

    expect(screen.getByAltText('RevConnect Logo')).toBeInTheDocument();
    expect(screen.getByText('Tell Everyone About Yourself!')).toBeInTheDocument();
  });

  it('should show edit form when Edit button is clicked', async () => {
    render(<BusinessProfile />);

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByPlaceholderText('Tell Everyone About Yourself!')).toBeInTheDocument();
  });

  it('should disable submit button if bio text length exceeds limit', async () => {
    render(<BusinessProfile />);

    fireEvent.click(screen.getByText('Edit'));

    const textarea = screen.getByPlaceholderText('Tell Everyone About Yourself!');
    fireEvent.change(textarea, { target: { value: 'a'.repeat(501) } });

    expect(screen.getByText('Submit')).toBeDisabled();
  });

  it('should hide edit form when Cancel button is clicked', async () => {
    render(<BusinessProfile />);

    fireEvent.click(screen.getByText('Edit'));

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByPlaceholderText('Tell Everyone About Yourself!')).not.toBeInTheDocument();
  });


  it('should display an error message when there is a network error', async () => {
    render(<BusinessProfile />);
    expect(await screen.findByText('No Profile For This User')).toBeInTheDocument();
  });

  it('should update bio when submit button is clicked', async () => {
    render(<BusinessProfile />);

    fireEvent.click(screen.getByText('Edit'));

    const textarea = screen.getByPlaceholderText('Tell Everyone About Yourself!');
    fireEvent.change(textarea, { target: { value: 'Updated bio' } });

    fireEvent.click(screen.getByText('Submit'));

    waitFor(() => {
      expect(screen.getByText('Updated bio')).toBeInTheDocument();
    });
  });

});
