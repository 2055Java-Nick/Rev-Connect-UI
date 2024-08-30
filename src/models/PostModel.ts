
export interface Post {
    postId: bigint;
    userId: number;
    createdAt: number; // Changed to number to match the timestamp format
    updatedAt?: number | null; // Updated to match the timestamp format and nullable
    title: string;
    content: string;
}
export interface PostResponse {
    post: Post;
    postLikes: number; // Updated field
}