// RegistrationForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm Component', () => {
  it('navigates to the landing page on successful form submission', () => {
    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    );

    // Simulate form submission
    fireEvent.change(screen.getByLabelText(/firstname/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/lastname/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/accounttype/i), { target: { value: 'user' } });
    fireEvent.click(screen.getByText(/register/i));

    // Check if navigation occurred
    expect(screen.getByText(/welcome, john/i)).toBeInTheDocument();
  });

  it('displays error message on form submission failure', () => {
    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    );

    // Simulate form submission failure
    fireEvent.click(screen.getByText(/register/i));

  });
});