import { useState, useEffect } from 'react';
import { updatePostById, deletePostById, getPostsByPage, getMediaByPostId } from '../services/postApi';
import { Media, Post as PostType } from '../types/postTypes';

export const usePosts = (initialPage: number = 0) => {
    const [postIdToEdit, setPostIdToEdit] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [posts, setPosts] = useState<PostType[]>([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [media, setMedia] = useState<{ [key: string]: Media[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const paginatedPosts = await getPostsByPage(page);
            setPosts(paginatedPosts);

        //     const mediaPromises = paginatedPosts.map(async (post) => {
        //         const postMedia = await getMediaByPostId(post.postId);
        //         return { postId: post.postId, media: postMedia };
        //     }
        // );

        //     const mediaResults = await Promise.all(mediaPromises);
        //     const mediaMap = mediaResults.reduce((acc, curr) => {
        //         acc[curr.postId.toString()] = curr.media;
        //         return acc;
        //     }, {} as { [key: string]: Media[] });

        //     setMedia(mediaMap);
        } catch (err) {
            setError('Error fetching posts');
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
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
            } catch (err) {
                setError('Error updating post');
                console.error('Error updating post:', err);
            }
        }
    };

    const handleDelete = async (postId: number) => {
        try {
            await deletePostById(postId);
            setPosts(posts.filter(post => post.postId !== postId));
            if (postIdToEdit === postId) {
                setPostIdToEdit(null);
                setEditTitle('');
                setEditContent('');
            }
        } catch (err) {
            setError('Error deleting post');
            console.error('Error deleting post:', err);
        }
    };

    const handleEdit = (postId: number, title: string, content: string) => {
        setPostIdToEdit(postId);
        setEditTitle(title);
        setEditContent(content);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return {
        posts,
        media,
        currentPage,
        goToPreviousPage,
        goToNextPage,
        handleUpdate,
        handleDelete,
        handleEdit,
        postIdToEdit,
        editTitle,
        editContent,
        setEditTitle,
        setEditContent,
        loading,
        error,
    };
};
