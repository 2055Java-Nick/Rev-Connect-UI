import React, { useState, useEffect } from 'react';
import {
    updatePostById,
    deletePostById,
    getPostsByPage,
    getMediaByPostId
} from '../services/api';
import '../styles/components/PostPage.modules.css'

interface Media {
    mediaId: bigint;
    postId: bigint;
    mediaUrl: string;
    mediaType: string;
    createdAt: string;
}

interface Post {
    postId: bigint;
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
}

const PostPage: React.FC = () => {
    const [postIdToEdit, setPostIdToEdit] = useState<bigint | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [editingPostId, setEditingPostId] = useState<bigint | null>(null);
    const [media, setMedia] = useState<{ [key: string]: Media[] }>({});
    
    
    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page: number) => {
        try {
            const paginatedPosts = await getPostsByPage(page);
            setPosts(paginatedPosts);

            const mediaPromises = paginatedPosts.map(async (post) => {
                const postMedia = await getMediaByPostId(post.postId);
                return { postId: post.postId, media: postMedia };
            });

            const mediaResults = await Promise.all(mediaPromises);
            const mediaMap = mediaResults.reduce((acc, curr) => {
                acc[curr.postId.toString()] = curr.media;
                return acc;
            }, {} as { [key: string]: Media[] });
            
            setMedia(mediaMap);

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // Handle updating a post
    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (postIdToEdit !== null) {
            try {
                const updatedPost = await updatePostById(postIdToEdit, editTitle, editContent);
                setPosts(posts.map(post => (post.postId === updatedPost.postId ? updatedPost : post)));
                setPostIdToEdit(null);
                setEditTitle('');
                setEditContent('');
                setEditingPostId(null);
            } catch (error) {
                console.error('Error updating post:', error);
            }
        }
    };

    // Handle deleting a post
    const handleDelete = async (postId: bigint) => {
        try {
            const response = await deletePostById(postId);
            console.log(response);
            const filteredPosts = posts.filter(post => post.postId !== postId);
            setPosts(filteredPosts);
            
            // Clear editing state if the deleted post was being edited
            if (editingPostId === postId) {
                setPostIdToEdit(null);
                setEditingPostId(null);
                setEditTitle('');
                setEditContent('');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    
    const renderMedia = (mediaList: Media[]) => {
        return mediaList.map((mediaItem) => {
            if (mediaItem.mediaType === 'IMAGE') {
                return <img key={mediaItem.mediaId.toString()} src={`http://localhost:8080/attachments/${mediaItem.mediaUrl}`} alt="Post Media" className="post-media" />;
            } else if (mediaItem.mediaType === 'VIDEO') {
                return <video key={mediaItem.mediaId.toString()} controls className="post-media"><source src={`http://localhost:8080/attachments/${mediaItem.mediaUrl}`} type="video/mp4" /></video>;
            }
            return null;
        });
    };

    return (
        <div className="post-container">
            <h2>Posts</h2>
            <ul className="post-list">
                {posts.map(post => (
                    <li key={post.postId.toString()} className="post-box">
                        <div className="post-header">
                            <img src="path-to-profile-image.jpg" 
                                 alt="User Profile" 
                                 className="profile-image" 
                                 />
                            <div className="post-details">
                                <h4 className="post-title">{post.title}</h4>
                                <small className="post-time">{new Date(post.createdAt).toLocaleString()}</small>
                            </div>
                            <div className="post-actions">
                                    <button
                                        onClick={() => {
                                            setEditingPostId(post.postId);
                                            setPostIdToEdit(post.postId);
                                            setEditTitle(post.title);
                                            setEditContent(post.content);
                                        }}
                                        className="edit-icon"
                                        title="Edit Post"
                                    >
                                        ✎
                                    </button>
                                <button
                                    onClick={() => handleDelete(post.postId)}
                                    className="delete-icon"
                                    title="Delete Post"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                        <p className="post-content">{post.content}</p>
                        {media[post.postId.toString()] && renderMedia(media[post.postId.toString()])}
                        {post.updatedAt && <small className="post-updated">Updated at: {new Date(post.updatedAt).toLocaleString()}</small>}
                        
                        {/* Update Form - Initially hidden, shown when edit icon is clicked */}
                        {editingPostId === post.postId && (
                            <form onSubmit={handleUpdate} className="update-post-form">
                                <div>
                                    <label>New Title:</label>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>New Content:</label>
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn">Update Post</button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
            <div className="pagination-controls">
                <button onClick={previousPage} 
                        disabled={currentPage === 0} 
                        className="btn">
                            Previous
                </button>
                <button onClick={nextPage} className="btn">Next</button>
            </div>
    </div>
);
};

export default PostPage;


