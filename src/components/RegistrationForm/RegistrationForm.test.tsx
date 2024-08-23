import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import RegistrationForm from './RegistrationForm';
import LandingPage from '../LandingPage/LandingPage';

describe('RegistrationForm Component', () => {
  it('navigates to the landing page on successful form submission', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/landing/:name" element={<LandingPage />} />
          <Route path="/" element={<RegistrationForm />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate form submission
    fireEvent.change(screen.getByLabelText(/Firstname/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Lastname/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Account Type/i), { target: { value: 'user' } });
    fireEvent.click(screen.getByText(/register/i));

    // Check if navigation occurred
    expect(await screen.findByText((content) => {
      return /welcome, john/i.test(content);
    })).toBeInTheDocument();
  });
});