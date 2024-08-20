import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'; //CHANGE THIS DEPENDING ON WHAT DEPENDENCY YOU NEED
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Profile from './Profile';

describe('Profile Page Component', () => {
    it('Should render the Profile page', () => {
        render(<Profile/>);

        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    });

    
    it('Should show errors when form is submitted with empty fields', () => {
        render(<Profile/>);
        
        const firstNameError = screen.getByText("First name is required.");
        const lastNameError = screen.getByText("Last name is required.");
        expect(firstNameError).not.toBeVisible();
        expect(lastNameError).not.toBeVisible();

        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
        
        expect(firstNameError).toBeVisible();
        expect(lastNameError).toBeVisible();
    });

    it('Should clear errors when form is modified to have valid entries', () => {
        render(<Profile/>);
        
        const firstNameError = screen.getByText("First name is required.");
        const lastNameError = screen.getByText("Last name is required.");
        expect(firstNameError).not.toBeVisible();
        expect(lastNameError).not.toBeVisible();

        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
        
        expect(firstNameError).toBeVisible();
        expect(lastNameError).toBeVisible();

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Valid' } })
        expect(firstNameError).not.toBeVisible();
        
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Valid' } })
        expect(lastNameError).not.toBeVisible();
    });
});