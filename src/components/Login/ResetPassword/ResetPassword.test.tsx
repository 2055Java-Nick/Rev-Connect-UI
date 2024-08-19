import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ResetPassword from './ResetPassword';

// Mocking axios with Vitest's vi.mock
vi.mock('axios');

describe('ResetPassword Component UI', () => {
  const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: MemoryRouter });
  };

  it('renders the form fields and submit button', () => {
    renderWithRouter(<ResetPassword />, { route: '/reset-password?token=valid-token' });

    expect(screen.getByLabelText(/New Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
  });

  it('shows an error message if passwords do not match', () => {
    renderWithRouter(<ResetPassword />, { route: '/reset-password?token=valid-token' });

    const passwordInput = screen.getByLabelText(/New Password:/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password:/i);
    const submitButton = screen.getByRole('button', { name: /Reset Password/i });

    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });

  it('shows an error message if token is invalid', () => {
    renderWithRouter(<ResetPassword />, { route: '/reset-password' });

    const passwordInput = screen.getByLabelText(/New Password:/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password:/i);
    const submitButton = screen.getByRole('button', { name: /Reset Password/i });

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Invalid token.')).toBeInTheDocument();
  });




});
