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
    handleEdit,
    postIdToEdit,
    editTitle,
    editContent,
    setEditTitle,
    setEditContent,
    loading,
    handlePinPost,
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
              onEdit={handleEdit}
              onDelete={handleDelete}
              isEditing={postIdToEdit === post.postId}
              onPin={() => handlePinPost(post.postId, post.isPinned)}
              editTitle={editTitle}
              editContent={editContent}
              setEditTitle={setEditTitle}
              setEditContent={setEditContent}
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
