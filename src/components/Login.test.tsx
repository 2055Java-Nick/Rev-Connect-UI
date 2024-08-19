import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';
import Login from './Login'; 

vi.mock('axios');

const mockedAxios = axios as typeof axios & { post: ReturnType<typeof vi.fn> };

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Login Component', () => {

  it('renders the login form correctly', () => {
    render(<Login />);

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('Check that error messages are displayed when submitted without any data', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(await screen.findByText(/Please input your username!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input your password!/i)).toBeInTheDocument();
  });

  it('Verifies correct data submission', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: { username: 'Ram' },
    });

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'Ram' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'Ram123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://192.168.68.78:8080/home/login',
        { username: 'Ram', password: 'Ram123', remember: true }
      );
    });
  });

  
});
