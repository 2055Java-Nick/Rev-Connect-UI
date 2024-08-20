import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react'; 
import '@testing-library/jest-dom';
import PostPage from './PostPage';
import { describe, expect, vi, beforeEach, afterEach, test } from 'vitest';
import { deletePostById, getMediaByPostId, getPostsByPage, updatePostById } from '../services/api';


// Mock the API functions
vi.mock('../services/api', () => ({
    getPostsByPage: vi.fn(),
    updatePostById: vi.fn(),
    deletePostById: vi.fn(),
    getMediaByPostId: vi.fn(),
}));

describe('PostPage Component', () => {
    const mockPosts = [
        {
            postId: BigInt(1),
            title: 'Test Post 1',
            content: 'Content for Post 1',
            createdAt: '2024-08-19T12:00:00Z',
            updatedAt: '2024-08-19T14:00:00Z',
        },
        {
            postId: BigInt(2),
            title: 'Test Post 2',
            content: 'Content for Post 2',
            createdAt: '2024-08-18T12:00:00Z',
        },
    ];

    const mockMedia = [
        {
            mediaId: BigInt(1),
            postId: BigInt(1),
            mediaUrl: 'image1.jpg',
            mediaType: 'IMAGE',
            createdAt: '2024-08-19T12:30:00Z',
        },
    ];

    beforeEach(() => {
        (getPostsByPage as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockPosts);
        (getMediaByPostId as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockMedia);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('renders correctly', async () => {
        render(<PostPage />);

        // Wait for posts to load
        await waitFor(() => expect(screen.getByText('Test Post 1')).toBeInTheDocument());

        // Check if posts are rendered
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
        expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });

    test('handles editing a post', async () => {
        render(<PostPage />);

        await waitFor(() => expect(screen.getByText('Test Post 1')).toBeInTheDocument());

        // Click edit button
        fireEvent.click(screen.getAllByTitle('Edit Post')[0]);

        // Check if edit form appears with correct data
        expect(screen.getByDisplayValue('Test Post 1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Content for Post 1')).toBeInTheDocument();

        // Update title and content
        fireEvent.change(screen.getByLabelText(/New Title/i), { target: { value: 'Updated Title' } });
        fireEvent.change(screen.getByLabelText(/New Content/i), { target: { value: 'Updated Content' } });

        // Mock update response
        (updatePostById as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
            ...mockPosts[0],
            title: 'Updated Title',
            content: 'Updated Content',
        });

        // Submit form
        fireEvent.submit(screen.getByRole('button', { name: /Update Post/i }));

        await waitFor(() => expect(screen.getByText('Updated Title')).toBeInTheDocument());

        // Check if post list is updated
        expect(screen.getByText('Updated Title')).toBeInTheDocument();
        expect(screen.getByText('Updated Content')).toBeInTheDocument();
    });

    test('handles deleting a post', async () => {
        render(<PostPage />);

        await waitFor(() => expect(screen.getByText('Test Post 1')).toBeInTheDocument());

        // Click delete button
        fireEvent.click(screen.getAllByTitle('Delete Post')[0]);

        // Mock delete response
        (deletePostById as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ success: true });

        // Wait for the post to be removed from the list
        await waitFor(() => expect(screen.queryByText('Test Post 1')).not.toBeInTheDocument());
    });

    test('handles pagination', async () => {
        render(<PostPage />);

        await waitFor(() => expect(screen.getByText('Test Post 1')).toBeInTheDocument());

        // Click next page button
        fireEvent.click(screen.getByRole('button', { name: /Next/i }));

        // Ensure getPostsByPage was called with the correct page number
        await waitFor(() => expect(getPostsByPage).toHaveBeenCalledWith(1));

        // Click previous page button
        fireEvent.click(screen.getByRole('button', { name: /Previous/i }));

        await waitFor(() => expect(getPostsByPage).toHaveBeenCalledWith(0));
    });
});