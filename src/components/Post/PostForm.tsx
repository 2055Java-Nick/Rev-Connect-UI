import { useState } from "react";
import { createPost } from "../../services/post";
import { NewPost } from "../../models/post";

const Form = () => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = () => {
    console.log(postContent);
    const post: NewPost = {
      postedBy: "userID",
      postText: postContent,
      timePostedEpoch: new Date(),
    };

    createPost(post);
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
