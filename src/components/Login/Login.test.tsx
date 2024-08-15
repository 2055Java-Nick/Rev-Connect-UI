import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Login from './Login';

describe('Login Component', () => {
    it('renders the login form', () => {
        render(<Login onSubmit={vi.fn()} />);
        
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('displays validation errors when form is submitted with empty fields', () => {
        render(<Login onSubmit={vi.fn()} />);
        
        fireEvent.submit(screen.getByRole('button', { name: /login/i }));
        
        expect(screen.getByText(/username is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    it('calls onSubmit with username and password when form is valid', () => {
        const mockOnSubmit = vi.fn();
        render(<Login onSubmit={mockOnSubmit} />);
        
        fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' },
        });
        
        fireEvent.submit(screen.getByRole('button', { name: /login/i }));
        
        expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'password123');
        expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });

    it('clears error messages after successful submission', () => {
        render(<Login onSubmit={vi.fn()} />);
        
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
