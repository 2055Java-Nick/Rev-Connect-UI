import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { postService } from "../../services/Post";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { PostModel } from "../../models/post";

export default function Post() {
  const { id } = useParams();
  const postId = id ? parseInt(id, 10) : undefined;
  const { data, error, loading } = useFetch<PostModel>(postService, postId);
  if (loading) return <>This component is loading ... </>;
  // TODO: install actual error boundaries
  if (error) return <ErrorBoundary />;
  if (!data) return <>No DATA!</>;

  return (
    <div className="flex">
      <div className="text-start">
        <label className="form-label" htmlFor="post-input">
          {data.postText}
        </label>
        <textarea
          id="post-input"
          className="form-control"
          placeholder={data.postText}
        />
      </div>
    </div>
  );
}
