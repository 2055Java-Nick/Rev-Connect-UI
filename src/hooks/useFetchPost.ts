import { useEffect, useState } from "react";
import { ApiError } from "../services/errors";
import { Post } from "../types/postTypes";
import { getPostById } from "../services/postApi";

export function useFetchPost(postId: number) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError(null);

      try {
        const { data } = await getPostById(postId);
        setPost(data as Post);
      } catch (error) {
        setError(error as ApiError);
        throw error;
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  return { post, loading, error };
}
