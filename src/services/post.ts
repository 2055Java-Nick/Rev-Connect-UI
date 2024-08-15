import apiContext from "./api";

interface Post {
  postId: number;
  postedBy: string;
  postText: string;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiContext.get("/posts");
  const { data } = response;
  return data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await apiContext.get(`/post/${id}`);
  const { data } = response;
  return data;
};

export const createPost = async (post: Post): Promise<Post> => {
  const response = await apiContext.post("/post", post);
  const { data } = response;
  return data;
};
