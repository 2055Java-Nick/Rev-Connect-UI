export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export function handleApiResponse<T>(response: any): ApiResponse<T> {
  return {
    status: response.status,
    data: response.data,
    message: response.data?.message,
  };
}
