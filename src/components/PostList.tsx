import { Link } from "react-router-dom";

const PostList = ({ posts }: { posts: PostType[] }) => {
  if (posts.length === 0)
    return (
      <div className="card">
        <div className="card-body">
          <h3>There are no new posts created</h3>
        </div>
      </div>
    );

  return (
    <div>
      {posts.map((post) => (
        <div className="card" key={post.id}>
          <div className="card-body">
            <h3>{post.title}</h3>
            <h3>{post.content}</h3>
            <Link to={`/post/${post.id}`}>View</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
