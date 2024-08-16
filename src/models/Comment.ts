export interface Comment {
  commentId: number;
  userId: number;
  postId: number;
  text: string;
  created_at: string;
  updated_at: string;
  likes: number; // not an attribute on comment table
}
