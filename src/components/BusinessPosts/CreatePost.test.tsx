import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides additional matchers for testing DOM elements
import CreatePost from './CreatePost'; // Import the component to be tested
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import { describe, expect, vi, beforeEach, afterEach, test } from 'vitest'; // Import Vitest utilities
import { createPost, getPostById } from '../../services/postApi'; // Mocked API services
import { useNavigate } from 'react-router-dom'; // Mocked navigation function

// Mock the API functions
vi.mock('../../services/api', () => ({
    createPost: vi.fn(), // Mock createPost API call
    getPostById: vi.fn(), // Mock getPostById API call
}));

// Partially mock react-router-dom to retain BrowserRouter while mocking useNavigate
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual, // Spread the original module contents
        useNavigate: vi.fn(), // Mock useNavigate function for navigation
    };
});

describe('CreatePost Component', () => {
    // Mock the navigation function
    const mockNavigate = vi.fn();

    // Before each test, ensure that the useNavigate mock returns the mockNavigate function
    beforeEach(() => {
        (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
    });

    // After each test, clear all mock data
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('renders correctly', () => {
        // Render the CreatePost component wrapped in BrowserRouter
        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );

        // Check that all form elements are rendered correctly
        expect(screen.getByText('Create a New Post')).toBeInTheDocument();
        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Media/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create Post/i })).toBeInTheDocument();
    });

    test('handles input changes correctly', () => {
        // Render the CreatePost component wrapped in BrowserRouter
        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );

        // Get the form elements by their labels
        const titleInput = screen.getByLabelText(/Title/i);
        const contentInput = screen.getByLabelText(/Content/i);
        const fileInput = screen.getByLabelText(/Media/i) as HTMLInputElement;

        // Simulate typing into the title and content inputs
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(contentInput, { target: { value: 'Test Content' } });

        // Simulate selecting a file in the file input
        const file = new File(['test'], 'test.png', { type: 'image/png' });
        fireEvent.change(fileInput, { target: { files: [file] } });

        // Assert that the inputs' values have been updated
        expect(titleInput).toHaveValue('Test Title');
        expect(contentInput).toHaveValue('Test Content');
        expect(fileInput.files![0]).toBe(file);
    });

    test('submits form and handles navigation correctly', async () => {
        // Mock the API response for creating a new post
        const mockNewPost = { postId: 1 };
        (createPost as ReturnType<typeof vi.fn>).mockResolvedValue(mockNewPost);
        (getPostById as ReturnType<typeof vi.fn>).mockResolvedValue(mockNewPost);


        // Render the CreatePost component wrapped in BrowserRouter
        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );

        // Simulate filling out the form
        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
        fireEvent.change(screen.getByLabelText(/Content/i), { target: { value: 'Test Content' } });

        // Simulate clicking the submit button
        fireEvent.click(screen.getByRole('button', { name: /Create Post/i }));

        // Wait for the async calls to complete and check that the correct API calls were made
        await waitFor(() => {
            expect(createPost).toHaveBeenCalled(); // Check if createPost was called
            expect(getPostById).toHaveBeenCalledWith(mockNewPost.postId); // Check if getPostById was called with the correct ID
            expect(mockNavigate).toHaveBeenCalledWith('/posts'); // Check if navigation to /posts occurred
        });
    });

    test('handles API errors during submission', async () => {
        // Mock the API to throw an error when trying to create a post
        (createPost as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('API Error'));


        // Render the CreatePost component wrapped in BrowserRouter
        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );

        // Simulate filling out the form
        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
        fireEvent.change(screen.getByLabelText(/Content/i), { target: { value: 'Test Content' } });

        // Simulate clicking the submit button
        fireEvent.click(screen.getByRole('button', { name: /Create Post/i }));

        // Wait for the async call and check that the error is handled (i.e., navigation doesn't happen)
        await waitFor(() => {
            expect(createPost).toHaveBeenCalled(); // Ensure createPost was called
            expect(mockNavigate).not.toHaveBeenCalled(); // Ensure navigation didn't occur due to the error
        });
    });
});

