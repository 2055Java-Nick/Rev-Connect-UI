import React, { FormEvent, useState } from "react";
import { PostProps, PostUpdate } from "../../types/postTypes";
import { usePostsContext } from "../../hooks/usePostsContext";

const Post: React.FC<PostProps> = ({ post }) => {
  const { updatePost, deletePost } = usePostsContext();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>(post.title);
  const [content, setContent] = useState<string | undefined>(post.content);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    const updatedPost = {
      ...post,
      title,
      content,
      taggedUserIds: [],
      tagNames: [],
    } as PostUpdate;

    await updatePost(updatedPost);
    setIsEditing(false);
  }
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <img
              src="path-to-profile-image.jpg"
              alt="User Profile"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <div>
              <h5 className="card-title mb-0">{post.title}</h5>
              <small className="text-muted">{post.createdAt}</small>
            </div>
          </div>
          <div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-sm btn-outline-primary me-2"
              title="Edit Post"
            >
              ✎
            </button>
            <button
              onClick={() => deletePost(post.postId)}
              className="btn btn-sm btn-outline-danger"
              title="Delete Post"
            >
              🗑️
            </button>
          </div>
        </div>
        <p className="card-text">{post.content}</p>
        {post.updatedAt && (
          <small className="text-muted">
            Updated at: {new Date(post.updatedAt).toLocaleString()}
          </small>
        )}
      </div>

      {isEditing && (
        <div className="card-footer">
          <form onSubmit={(e) => handleSave(e)}>
            <div className="mb-3">
              <label htmlFor="editTitle" className="form-label">
                New Title:
              </label>
              <input
                id="editTitle"
                type="text"
                defaultValue={post.title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editContent" className="form-label">
                New Content:
              </label>
              <textarea
                id="editContent"
                defaultValue={post.content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Update Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
