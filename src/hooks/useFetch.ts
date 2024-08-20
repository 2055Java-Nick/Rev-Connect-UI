import { useEffect, useState } from "react";
import { FetchResult } from "../types";
import { BaseService } from "../services/BaseService";

export default function useFetch<T>(
  service: BaseService<T>,
  postId?: number,
): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (postId == undefined) {
          throw new Error("postId cannot be undefined");
        }
        const result = await service.get(postId);
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [service, postId]);

  return { data, error, loading };
}
