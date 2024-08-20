import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For matchers like toBeInTheDocument
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../Context/UserContext'; // Import the UserProvider
import Login from './Login';

describe('Login Component UI', () => {
    it('renders the form fields correctly', () => {
        render(
            <MemoryRouter>
                <UserProvider> {/* Wrap the component with UserProvider */}
                    <Login />
                </UserProvider>
            </MemoryRouter>
        );

        // Check that the username and password fields are rendered
        expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();

        // Check that the submit button is rendered
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();

        // Check that the "Forgot password?" link is rendered
        expect(screen.getByText(/Forgot password\?/i)).toBeInTheDocument();
    });

    it('displays validation errors when submitting empty form', () => {
        render(
            <MemoryRouter>
                <UserProvider> {/* Wrap the component with UserProvider */}
                    <Login />
                </UserProvider>
            </MemoryRouter>
        );

        // Simulate form submission without entering data
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Check that validation errors are displayed
        expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });

    it('updates input fields when typing', () => {
        render(
            <MemoryRouter>
                <UserProvider> {/* Wrap the component with UserProvider */}
                    <Login />
                </UserProvider>
            </MemoryRouter>
        );

        const usernameInput = screen.getByLabelText(/Username:/i) as HTMLInputElement;
        const passwordInput = screen.getByLabelText(/Password:/i) as HTMLInputElement;

        // Simulate user typing in the input fields
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(passwordInput, { target: { value: 'testPass' } });

        // Check that the input fields have the expected values
        expect(usernameInput.value).toBe('testUser');
        expect(passwordInput.value).toBe('testPass');
    });

    it('shows success message from location state', () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/login', state: { successMessage: 'Password reset successful!' } }]}>
                <UserProvider> {/* Wrap the component with UserProvider */}
                    <Login />
                </UserProvider>
            </MemoryRouter>
        );

        // Check that the success message is displayed
        expect(screen.getByText(/Password reset successful!/i)).toBeInTheDocument();
    });
});