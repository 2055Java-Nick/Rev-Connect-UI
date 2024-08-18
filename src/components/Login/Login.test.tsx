import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import Login from './Login';
import { UserProvider } from '../Context/UserContext';

// Mocking axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Login Component', () => {
    const renderWithProvider = (ui: React.ReactElement) => {
        return render(<UserProvider>{ui}</UserProvider>);
    };

    it('renders the login form', () => {
        renderWithProvider(<Login />);
        
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('displays validation errors when form is submitted with empty fields', () => {
        renderWithProvider(<Login />);
        
        fireEvent.submit(screen.getByRole('button', { name: /login/i }));
        
        expect(screen.getByText(/username is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    it('submits the form with username and password when form is valid', async () => {
        // Mocking the API response
        mockedAxios.post.mockResolvedValueOnce({
            data: { id: '123', username: 'testuser' },
        });

        renderWithProvider(<Login />);
        
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' },
        });
        
        fireEvent.submit(screen.getByRole('button', { name: /login/i }));
        
        // Wait for the success message to appear
        const successMessage = await screen.findByText(/login successful/i);
        expect(successMessage).toBeInTheDocument();
        
        // Ensure the axios post was called with the correct parameters
        expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8080/login', null, {
            params: {
                userId: 'testuser',
                password: 'password123',
            },
        });
    });

    it('clears error messages after successful submission', () => {
        renderWithProvider(<Login />);
        
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' },
        });
        
        fireEvent.submit(screen.getByRole('button', { name: /login/i }));
        
        expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
    });
});
