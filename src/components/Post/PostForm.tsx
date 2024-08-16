import { useEffect, useState } from "react";
import { createPost, getPosts } from "../../services/post";
import { NewPost, Post } from "../../models/post";

const Form = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([] as unknown as Post);
  const getAllPosts = async () => {
    const response = await getPosts();
    if (response) setPosts(response);
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  const handleSubmit = async () => {
    const post: NewPost = {
      postedBy: 9999,
      postText: postContent,
      timePostedEpoch: Math.floor(new Date().getTime() / 1000),
    };

    const response = await createPost(post);
    console.log(response);
  };

  return (
    <div className="flex">
      <div className="text-start">
        <label className="form-label" htmlFor="post-input">
          New Post
        </label>
        <textarea
          id="post-input"
          className="form-control"
          onChange={(e) => setPostContent(e.target.value)}
        />
      </div>
      <div className="d-flex mt-2">
        <button className="btn btn-primary ms-auto" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Form;
