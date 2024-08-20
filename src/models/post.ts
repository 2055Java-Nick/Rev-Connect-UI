export interface PostModel {
  postId: number;
  postText: string;
  postedBy: number;
}

export interface NewPost {
  postText: string;
  postedBy: number;
}
