import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Post from './Post';
import { describe, expect, vi, test } from 'vitest';
import { likePost } from '../../services/api';
import { PostResponse } from '../../models/PostModel';


// Mock the `likePost` function from the API module
vi.mock('../../services/api', () => ({
    likePost: vi.fn(),
  }))
// Mocking the API functions might be necessary if they are used within the Post component
describe('Post Component', () => {
    const mockPost = {
        postId: BigInt(1),
        userId: 1,
        title: 'Test Post 1',
        content: 'Content for Post 1',
        createdAt: 1724765164565,
        updatedAt: 1724765164565,
    };
    const mockPostResponse = {
        post: mockPost,
        postLikes: 1
    }

    const mockMedia = [
        {
            mediaId: BigInt(1),
            postId: BigInt(1),
            mediaUrl: 'image1.jpg',
            mediaType: 'IMAGE',
            createdAt: '2024-08-19T12:30:00Z',
        },
    ];

    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();
    const mockSetEditTitle = vi.fn();
    const mockSetEditContent = vi.fn();
    const mockHandleUpdate = vi.fn();

    test('renders post correctly', () => {
        render(
            <Post
                postResponse={mockPostResponse}
                media={mockMedia}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                isEditing={false}
                editTitle={mockPost.title}
                editContent={mockPost.content}
                setEditTitle={mockSetEditTitle}
                setEditContent={mockSetEditContent}
                handleUpdate={mockHandleUpdate}
            />
        );

        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
        expect(screen.getByText('Content for Post 1')).toBeInTheDocument();
        expect(screen.getByAltText('Post Media')).toBeInTheDocument();
    });

    test('handles editing a post', () => {
        render(
            <Post
                postResponse={mockPostResponse}
                media={mockMedia}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                isEditing={false}
                editTitle={mockPost.title}
                editContent={mockPost.content}
                setEditTitle={mockSetEditTitle}
                setEditContent={mockSetEditContent}
                handleUpdate={mockHandleUpdate}
            />
        );

        // Click edit button
        fireEvent.click(screen.getByTitle('Edit Post'));

        // Check if onEdit was called with the correct arguments
        expect(mockOnEdit).toHaveBeenCalledWith(mockPostResponse.post.postId,mockPostResponse.post.title, mockPostResponse.post.content);
    });

    test('handles deleting a post', () => {
        render(
            <Post
                postResponse={mockPostResponse}
                media={mockMedia}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                isEditing={false}
                editTitle={mockPost.title}
                editContent={mockPost.content}
                setEditTitle={mockSetEditTitle}
                setEditContent={mockSetEditContent}
                handleUpdate={mockHandleUpdate}
            />
        );

        // Click delete button
        fireEvent.click(screen.getByTitle('Delete Post'));

        // Check if onDelete was called with the correct postId
        expect(mockOnDelete).toHaveBeenCalledWith(mockPost.postId);
    });

    test('testing for like', async () => {
        const likeResponse: PostResponse = {
            post: mockPost, // Use the same mock post
            postLikes: mockPostResponse.postLikes + 1, // Incremented likes
          };
          const unlikeResponse: PostResponse = {
            post: mockPost, // Use the same mock post
            postLikes: mockPostResponse.postLikes, // Original likes
          };
        // Mock the `likePost` function
        vi.mocked(likePost).mockResolvedValueOnce(likeResponse) // First click should increment likes
                            .mockResolvedValueOnce(unlikeResponse); // Second click should decrement likes
    
        render(
            <Post
                postResponse={mockPostResponse}
                media={mockMedia}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                isEditing={false}
                editTitle={mockPost.title}
                editContent={mockPost.content}
                setEditTitle={mockSetEditTitle}
                setEditContent={mockSetEditContent}
                handleUpdate={mockHandleUpdate}
            />
        );

        // Initially, the like count should be 1
        expect(screen.getByText('Like (1)')).toBeInTheDocument();
    
        // Click the like button
        const likeButton = screen.getByText('Like (1)');
        fireEvent.click(likeButton);
    
        // Verify that the likePost function was called with the correct arguments
        expect(likePost).toHaveBeenCalledWith(
            mockPost.postId,
            mockPost.userId
        );
    
        // Wait for the like count to be updated to 2
        await waitFor(() => {
            expect(screen.getByText('Like (2)')).toBeInTheDocument();
        });
    
        // Click the like button again to test the un-like functionality
        fireEvent.click(screen.getByText('Like (2)'));
    
        // Verify that the likePost function was called again
        expect(likePost).toHaveBeenCalledWith(
            mockPost.postId,
            mockPost.userId
        );
    
        // Wait for the like count to be back to 1
        await waitFor(() => {
            expect(screen.getByText('Like (1)')).toBeInTheDocument();
        });
    });
    
});
