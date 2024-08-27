import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm', () => {
  it('renders the form with all fields', () => {
    render(<RegistrationForm />);

    // Check if all form fields are rendered
    expect(screen.getByLabelText(/Firstname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Lastname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Account Type/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  it('shows validation messages on submit without filling fields', async () => {
    render(<RegistrationForm />);

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findByText(/Please input your firstname!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input your lastname!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input your username!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input your email!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input your password!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please select your account type!/i)).toBeInTheDocument();
  });

  // Add more tests as needed
});