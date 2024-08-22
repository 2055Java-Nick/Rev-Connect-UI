import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Post from './Post';
import { describe, expect, vi, test } from 'vitest';

// Mocking the API functions might be necessary if they are used within the Post component

describe('Post Component', () => {
    const mockPost = {
        postId: BigInt(1),
        title: 'Test Post 1',
        content: 'Content for Post 1',
        createdAt: '2024-08-19T12:00:00Z',
        updatedAt: '2024-08-19T14:00:00Z',
    };

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
                post={mockPost}
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
                post={mockPost}
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
        expect(mockOnEdit).toHaveBeenCalledWith(mockPost.postId, mockPost.title, mockPost.content);
    });

    test('handles deleting a post', () => {
        render(
            <Post
                post={mockPost}
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
});
