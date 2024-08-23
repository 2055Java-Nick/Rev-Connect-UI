import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom'; // Import this to extend matchers
import LandingPage from './LandingPage';

describe('LandingPage Component', () => {
  it('renders the welcome message with the name from the route params', () => {
    render(
      <MemoryRouter initialEntries={['/landing/test']}>
        <Routes>
          <Route path="/landing/:name" element={<LandingPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome, test!')).toBeInTheDocument();
    expect(screen.getByText("Thank you for registering. We're glad to have you here.")).toBeInTheDocument();
  });
});