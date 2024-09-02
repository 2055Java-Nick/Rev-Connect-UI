import { useState } from "react";
import { Post, PostUpdate } from "../types/postTypes";
import { ApiError } from "../services/errors";
import { createPost } from "../services/postApi";

export function useCreatePost() {
  const [newPost, setNewPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handleCreatePost(post: PostUpdate) {
    setLoading(true);
    setError(null);

    try {
      const { data } = await createPost(post);
      setNewPost(data as Post);
      return data;
    } catch (error) {
      setError(error as ApiError);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { newPost, handleCreatePost, loading, error };
}
