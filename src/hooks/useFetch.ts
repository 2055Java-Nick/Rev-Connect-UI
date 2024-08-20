import { useEffect, useState } from "react";
import { FetchResult } from "../types";
import { BaseService } from "../services/BaseService";

export default function useFetch<T>(
  service: BaseService<T>,
  postId?: number,
): FetchResult<T | T[]> {
  const [data, setData] = useState<T | T[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let result;
        if (postId !== undefined) {
          result = await service.get(postId);
        } else {
          result = await service.getAll();
        }
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
