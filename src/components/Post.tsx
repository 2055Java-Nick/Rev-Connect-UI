import React, { useState } from 'react';
import {
    createPost,
    updatePostById,
    deletePostById
} from '../services/api';

const Post: React.FC = () => {
    const [newText, setNewText] = useState('');
    const [postIdToEdit, setPostIdToEdit] = useState<number | null>(null);
    const [editText, setEditText] = useState('');
    const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);

    // Handle creating a new post
    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const newPost = await createPost(newText);
            console.log('Post created:', newPost);
            setNewText('');  // Clear the input after creation
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    // Handle updating a post
    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (postIdToEdit !== null) {
            try {
                const updatedPost = await updatePostById(postIdToEdit, editText);
                console.log('Post updated:', updatedPost);
                setPostIdToEdit(null);  // Clear edit state after successful update
                setEditText('');
            } catch (error) {
                console.error('Error updating post:', error);
            }
        }
    };

    // Handle deleting a post
    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
        if (postIdToDelete !== null) {
            try {
                const response = await deletePostById(postIdToDelete);
                console.log('Post deleted:', response);
                setPostIdToDelete(null);  // Clear delete state after successful deletion
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    return (
        <div>
            <h2>Manage Posts</h2>
            
            {/* Create Post Form */}
            <form onSubmit={handleCreate}>
                <div>
                    <label>Create New Post:</label>
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Post</button>
            </form>

            {/* Update Post Form */}
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Post ID to Edit:</label>
                    <input
                        type="number"
                        value={postIdToEdit !== null ? postIdToEdit : ''}
                        onChange={(e) => setPostIdToEdit(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>New Text:</label>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Post</button>
            </form>

            {/* Delete Post Form */}
            <form onSubmit={handleDelete}>
                <div>
                    <label>Post ID to Delete:</label>
                    <input
                        type="number"
                        value={postIdToDelete !== null ? postIdToDelete : ''}
                        onChange={(e) => setPostIdToDelete(Number(e.target.value))}
                        required
                    />
                </div>
                <button type="submit">Delete Post</button>
            </form>
        </div>
    );
};

export default Post;

