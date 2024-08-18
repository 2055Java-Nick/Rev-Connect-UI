export interface Comment {
  commentId?: number;
  userId: number;
  postId: number;
  text: string;
  timePosted: string;
}
export interface CommentResponse {
  comment: Comment;
  likesCount: number;
}
