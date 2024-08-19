import { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost";
import PostList from "../../components/PostList";

const HomePage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllPosts = async () => {
    setLoading(true);
    await fetch("http://localhost:8080/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container py-6 mx-auto">
      {/*<CreatePost />*/}
      <PostList posts={posts} />
    </div>
  );
};

export default HomePage;
