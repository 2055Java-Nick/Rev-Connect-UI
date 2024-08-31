import { useState, useEffect } from "react";
import {
  updatePostById,
  deletePostById,
  getPostsByPage,
  getMediaByPostId,
} from "../services/postApi";
import { Media, Post, Post as PostType, PostUpdate } from "../types/postTypes";

export const usePosts = (initialPage: number = 0) => {
  const [postToEdit, setPostToEdit] = useState<Post | null>();
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

      const mediaPromises = paginatedPosts.map(async (post: Post) => {
        const postMedia = await getMediaByPostId(post.postId);
        return { postId: post.postId, media: postMedia };
      });

      const mediaResults = await Promise.all(mediaPromises);
      const mediaMap = mediaResults.reduce(
        (acc, curr) => {
          acc[curr.postId.toString()] = curr.media;
          return acc;
        },
        {} as { [key: string]: Media[] },
      );

      setMedia(mediaMap);
    } catch (err) {
      setError("Error fetching posts");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    event: React.FormEvent,
    postToUpdate: PostUpdate,
  ) => {
    event.preventDefault();
    if (postToEdit?.postId !== null) {
      try {
        const post = {
          authorId: postToUpdate.authorId,
          taggedUserIds: [],
          tagNames: postToUpdate.tagNames,
          postId: postToUpdate.postId,
          title: postToUpdate.title,
          content: postToUpdate.content,
        };

        console.log(post);
        const updatedPost = await updatePostById(post);
        const newPosts = posts.map((post) =>
          post.postId === updatedPost.postId ? updatedPost : post,
        );
        setPosts(newPosts);
        setPostToEdit(null);
      } catch (err) {
        setError("Error updating post");
        console.error("Error updating post:", err);
      }
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      await deletePostById(postId);
      setPosts(posts.filter((post) => post.postId !== postId));
      if (postToEdit?.postId === postId) {
        setPostToEdit(null);
      }
    } catch (err) {
      setError("Error deleting post");
      console.error("Error deleting post:", err);
    }
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
    postToEdit,
    setPostToEdit,
    loading,
    error,
  };
};
