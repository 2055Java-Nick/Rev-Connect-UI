import { ApiError } from "../services/errors";
import { Post, PostUpdate } from "./postTypes";

export interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  loginUser: (username: string, password: string) => Promise<void>;
  registerUser: (data: any) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
  error: ApiError | null;
}

export interface PostContextProps {
  posts: Post[];
  loading: boolean;
  error: ApiError | null;
  createPost: (post: PostUpdate) => Promise<Post>;
  updatePost: (post: PostUpdate) => Promise<Post>;
  deletePost: (postId: number) => Promise<void>;
  refetchPosts: () => void;
  page: number | undefined;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}
