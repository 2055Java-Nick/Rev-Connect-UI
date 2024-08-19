import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For matchers like toBeInTheDocument
import { describe, expect, it } from 'vitest';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword Component UI', () => {
    it('renders the email input and submit button', () => {
        render(<ForgotPassword />);

        // Check that the email input and submit button are rendered
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Request Password Reset/i })).toBeInTheDocument();
    });


    it('does not show an error message for a valid email format', () => {
        render(<ForgotPassword />);

        const emailInput = screen.getByLabelText(/Email:/i) as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /Request Password Reset/i });

        // Simulate user entering a valid email and submitting the form
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        // Check that no error message is displayed
        expect(screen.queryByText(/Please enter a valid email address./i)).not.toBeInTheDocument();
    });

    it('disables the email input and shows a loading state when submitting', () => {
        render(<ForgotPassword />);

        const emailInput = screen.getByLabelText(/Email:/i) as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /Request Password Reset/i });

        // Simulate user entering a valid email
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        // Simulate form submission
        fireEvent.click(submitButton);

        // Check that the email input is disabled
        expect(emailInput).toBeDisabled();

        // Check that the submit button shows the loading state
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent(/Submitting/i);
    });


});
