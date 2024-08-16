export interface Post {
  postId: number;
  postText: string;
  postedBy: number;
  timePostedEpoch: number;
}

export interface NewPost {
  postText: string;
  postedBy: number;
  timePostedEpoch: number;
}
