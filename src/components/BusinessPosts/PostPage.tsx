import React, { useState, useEffect } from 'react';
import {
    updatePostById,
    deletePostById,
    getPostsByPage,
    getMediaByPostId
} from '../../services/api';
import Post from './Post'; 
import '../../styles/components/PostPage.modules.css'

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
interface PostResponse {
    post: Post;
    likesCount: number;
}
const PostPage: React.FC = () => {
    const [postIdToEdit, setPostIdToEdit] = useState<bigint | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [media, setMedia] = useState<{ [key: string]: Media[] }>({});
    
    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page: number) => {
        try {
            const paginatedPosts = await getPostsByPage(page);
            setPosts(paginatedPosts);

            const mediaPromises = paginatedPosts.map(async (post: Post) => {
                const postMedia = await getMediaByPostId(post.postId);
                return { postId: post.postId, media: postMedia };
            });

            const mediaResults = await Promise.all(mediaPromises);
            // Reduce the array of media results into an object (mediaMap) where each key is a postId (as a string),
            // and the value is an array of media items associated with that postId.
            const mediaMap = mediaResults.reduce((acc, curr) => {
            // Convert the postId to a string and use it as the key in the mediaMap object
                acc[curr.postId.toString()] = curr.media;
            // Return the accumulator for the next iteration
                return acc;
            // Initial value is an empty object with a specified type
            }, {} as { [key: string]: Media[] });
            
            setMedia(mediaMap);

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (postIdToEdit !== null) {
            try {
                const updatedPost = await updatePostById(postIdToEdit, editTitle, editContent);
                setPosts(posts.map(post => (post.postId === updatedPost.postId ? updatedPost : post)));
                setPostIdToEdit(null);
                setEditTitle('');
                setEditContent('');
            } catch (error) {
                console.error('Error updating post:', error);
            }
        }
    };

    const handleDelete = async (postId: bigint) => {
        try {
            await deletePostById(postId);
            setPosts(posts.filter(post => post.postId !== postId));
            if (postIdToEdit === postId) {
                setPostIdToEdit(null);
                setEditTitle('');
                setEditContent('');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleEdit = (postId: bigint, title: string, content: string) => {
        setPostIdToEdit(postId);
        setEditTitle(title);
        setEditContent(content);
    };

    return (
        <div className="post-container">
            <h2>Posts</h2>
            <ul className="post-list">
                {posts.map(post => (
                    <Post 
                        key={post.postId.toString()} 
                        post={post} 
                        media={media[post.postId.toString()] || []} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                        isEditing={postIdToEdit === post.postId}
                        editTitle={editTitle}
                        editContent={editContent}
                        setEditTitle={setEditTitle}
                        setEditContent={setEditContent}
                        handleUpdate={handleUpdate}
                    />
                ))}
            </ul>
            <div className="pagination-controls">
                <button onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 0))} 
                        disabled={currentPage === 0} 
                        className="btn">
                    Previous
                </button>
                <button onClick={() => setCurrentPage(prevPage => prevPage + 1)} className="btn">Next</button>
            </div>
        </div>
    );
};

export default PostPage;
