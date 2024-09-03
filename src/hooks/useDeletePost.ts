import { useState } from "react";
import { ApiError } from "../services/errors";
import { deletePostById } from "../services/postApi";

export function useDeletePost() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handleDeletePost(postId: number) {
    setLoading(true);
    setError(null);

    try {
      await deletePostById(postId);
    } catch (error) {
      setError(error as ApiError);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    handleDeletePost,
  };
}
