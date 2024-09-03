export interface Media {
  mediaId: number;
  postId: number;
  mediaUrl: number;
  mediaType: string;
  createdAt: string;
}

export interface Post {
  postId: number;
  authorId: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  tagNames: string[];
  taggedUsernames: string[];
  isPrivate: boolean;
}

export interface PostUpdate {
  postId?: number;
  authorId: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  tagNames?: string[];
  taggedUserIds?: number[];
  isPrivate: boolean;
}

export interface PostProps {
  post: Post;
}
