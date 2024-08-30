export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleApiResponse<T>(response: any): ApiResponse<T> {
  return {
    status: response.status,
    data: response.data,
    message: response.data?.message,
  };
}
