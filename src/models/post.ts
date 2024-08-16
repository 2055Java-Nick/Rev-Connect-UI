export interface Post {
  postId: number;
  postText: string;
  postedBy: string;
  timePostedEpoch: Date;
}

export interface NewPost {
  postText: string;
  postedBy: string;
  timePostedEpoch: Date;
}
