export interface Comment {
  commentId?: number;
  userId: number;
  postId: number;
  text: string;
  timePosted: Date;
}
export interface CommentResponse {
  comment: Comment;
  likesCount: number;
}
export interface CommentsSectionProps {
  postId: number;
  userId: number;
}
