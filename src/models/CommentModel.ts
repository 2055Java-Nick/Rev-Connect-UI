export interface Comment {
  commentId?: number;
  userId: number;
  postId: bigint;
  text: string;
  timePosted: Date;
}
export interface CommentResponse {
  comment: Comment;
  likesCount: number;
}
