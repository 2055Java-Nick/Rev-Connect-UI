import React from "react";
import Post from "./Post";
import { usePosts } from "../../hooks/usePosts";

const PostPage: React.FC = () => {
  const {
    posts,
    media,
    currentPage,
    goToPreviousPage,
    goToNextPage,
    handleUpdate,
    handleDelete,
    setPostToEdit,
    postToEdit,
    loading,
    error,
  } = usePosts(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2 className="my-4">Posts</h2>
      <ul className="list-group">
        {posts.map((post) => (
          <li className="list-group-item" key={post.postId.toString()}>
            <Post
              post={post}
              media={media[post.postId.toString()] || []}
              onEdit={setPostToEdit}
              onDelete={handleDelete}
              isEditing={postToEdit?.postId === post.postId}
              handleUpdate={handleUpdate}
            />
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between my-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="btn btn-secondary"
        >
          Previous
        </button>
        <button onClick={goToNextPage} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
};

export default PostPage;
