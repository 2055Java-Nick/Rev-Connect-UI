import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, getPostById } from '../services/api';

const CreatePost: React.FC = () => {
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', newTitle);
            formData.append('content', newContent);
            if (file) {
                formData.append('file', file);
            }
            const newPost = await createPost(formData);
            const fetchPost = await getPostById(newPost.postId);
            console.log('Post created:', fetchPost);
            setNewTitle('');
            setNewContent('');
            setFile(null);
            navigate('/posts'); // after creating post, navigate to posts page
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="create-post-container">
            <h2>Create a New Post</h2>
            <form onSubmit={handleCreate} className="create-post-form">
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Media (Image/Video):</label>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
                <button type="submit" className="btn">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
