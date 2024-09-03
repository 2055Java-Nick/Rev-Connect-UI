import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../services/errors";
import { Post } from "../types/postTypes";
import { getPostsByPage } from "../services/postApi";

export function useFetchPosts(page: number = 0) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await getPostsByPage(page);
      setPosts(data as Post[]);
    } catch (error) {
      setError(error as ApiError);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, refetchPosts: fetchPosts, loading, error };
}
