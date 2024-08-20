export interface FetchResult<T> {
  data: T | null | undefined;
  error: Error | null;
  loading: boolean;
}
