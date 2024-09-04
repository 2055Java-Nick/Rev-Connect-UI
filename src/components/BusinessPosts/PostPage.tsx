import Post from "./Post";
import { usePostsContext } from "../../hooks/usePostsContext";

export default function PostPage() {
  const { posts, loading, error, page, goToPreviousPage, goToNextPage } =
    usePostsContext();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="container">
      <h2 className="my-4">Posts</h2>
      <ul className="list-group">
        {posts.map((post) => (
          <li className="list-group-item" key={post.postId.toString()}>
            <Post post={post} />
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between my-4">
        <button
          onClick={goToPreviousPage}
          disabled={page === 0}
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
}
