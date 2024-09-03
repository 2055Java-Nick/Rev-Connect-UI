import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostsContext } from "../../hooks/usePostsContext";
import { Post, PostUpdate } from "../../types/postTypes";
import { ApiError } from "../../services/errors";

export default function CreatePost() {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [createdPost, setCreatedPost] = useState<Post | null>(null);
  const { createPost } = usePostsContext();

  const navigate = useNavigate();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newPost = {
        title: newTitle,
        authorId: 1,
        content: newContent,
        tagNames: [],
        isPrivate: isPrivate,
      } as PostUpdate;

      const response = await createPost(newPost);
      setCreatedPost(response);
    } catch (error) {
      setError(error as ApiError);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (createdPost) {
      navigate("/posts/" + createdPost.postId);
    }
  }, [createdPost, navigate]);

  if (error) return <>{error.message}</>;
  if (loading) return <>Loading...</>;

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleCreate} className="create-post-form">
        <div>
          <label htmlFor="newTitle">Title:</label>
          <input
            id="newTitle"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newContent">Content:</label>
          <textarea
            id="newContent"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            required
          />
        </div>
          <label htmlFor="isPrivate"> Private post?</label>
        <div>
          <label>

          <input
            type="radio"
            name="privacy"
            value="public"
            checked={!isPrivate}
            onChange={()=> setIsPrivate(false)}
            />
            Public
            </label>
        </div>
        <div>
          <label>

        <input
            type="radio"
            name="privacy"
            value="private"
            checked={isPrivate}
            onChange={()=> setIsPrivate(true)}
            />
            Private
            </label>
        </div>
        <button type="submit" className="btn">
          Create Post
        </button>
      </form>
    </div>
  );
}
