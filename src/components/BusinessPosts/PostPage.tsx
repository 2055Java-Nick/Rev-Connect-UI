import React, { useState, useEffect } from 'react';
import {
    updatePostById,
    deletePostById,
    getPostsByPage,
    getMediaByPostId
} from '../../services/api';
import Post from './Post'; 
import '../../styles/components/PostPage.modules.css'
import { Post as PostType, PostResponse } from '../../models/PostModel';

interface Media {
    mediaId: bigint;
    postId: bigint;
    mediaUrl: string;
    mediaType: string;
    createdAt: string;
}



const PostPage: React.FC = () => {
    const [postIdToEdit, setPostIdToEdit] = useState<bigint | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [media, setMedia] = useState<{ [key: string]: Media[] }>({});
    
    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page: number) => {
        try {
            // Fetch paginated posts
            const paginatedPosts = await getPostsByPage(page);
            
            // Destructure PostType from PostResponse
            const postsWithMediaPromises = paginatedPosts.map(async (postResponse: PostResponse) => {
                // Destructure the post object
                const { post } = postResponse;
    
                // Log the post for debugging
    
                // Fetch media for the post
                const postMedia = await getMediaByPostId(post.postId);
    
                return { postId: post.postId, media: postMedia };
            });
    
            // Resolve all media fetch promises
            const mediaResults = await Promise.all(postsWithMediaPromises);
    
            // Reduce the array of media results into a mediaMap object
            const mediaMap = mediaResults.reduce((acc, { postId, media }) => {
                acc[postId.toString()] = media;
                return acc;
            }, {} as { [key: string]: Media[] });
    
            // Update state with posts and media
            setPosts(paginatedPosts);
            setMedia(mediaMap);
    
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    
    console.log(posts)
    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (postIdToEdit !== null) {
            try {
                const updatedPost = await updatePostById(postIdToEdit, editTitle, editContent);
                setPosts(posts.map(post => (post.post.postId === updatedPost.postId ? updatedPost : post)));
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
            setPosts(posts.filter(post => post.post.postId !== postId));
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
    console.log(media)
    return (
        <div className="post-container">
            <h2>Posts</h2>
            <ul className="post-list ">
                {posts.map(post => (
                    <Post 
                        key={post.post.postId.toString()} 
                        postResponse={post} 
                        media={media[post.post.postId.toString()] || []} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                        isEditing={postIdToEdit === post.post.postId}
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
