// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';


describe('App component', () => {
  it('renders RegistrationForm component for the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it('renders LandingPage component for the /landing/:name path', () => {
    render(
      <MemoryRouter initialEntries={['/landing/test']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
});