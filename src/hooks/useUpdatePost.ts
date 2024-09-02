import { useState } from "react";
import { ApiError } from "../services/errors";
import { Post, PostUpdate } from "../types/postTypes";
import { updatePost } from "../services/postApi";

export function useUpdatePost() {
  const [updatedPost, setUpdatedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handleUpdatePost(post: PostUpdate) {
    setLoading(true);
    setError(null);

    try {
      const { data } = await updatePost(post);
      setUpdatedPost(data as Post);
      return data as Post;
    } catch (error) {
      setError(error as ApiError);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { updatedPost, loading, error, handleUpdatePost };
}
