import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface PostData {
  title: string;
  content: string;
}

const PostInfo = () => {
  // get Ids for each post from the route params
  const { id } = useParams();
  const [post, setPost] = useState<PostType>(); //current post
  const [error, SetError] = useState<string | null>(); //state to display error
  const [isEditing, SetIsEditing] = useState<boolean>(false); //state to monitor if post is being editted
  const [isUpdating, SetIsUpdating] = useState<boolean>(false); //to monitor when the api request is made
  const [loading, setLoading] = useState<boolean>(false); //loading state for the inital fetch
  const [postData, setPostData] = useState<PostData>({
    title: "",
    content: "", //update the input fields
  });

  const navigate = useNavigate();

  //function to get a post
  const getPost = async () => {
    setLoading(true);
    await fetch(`http://localhost:8080/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => SetError(err.message))
      .finally(() => setLoading(false));
  };

  //handle edit click
  const handleCanelEdit = () => {
    SetIsEditing(false);
    post &&
      setPostData({
        content: post.content,
        title: post.title,
      });
  };

  //update post
  const handlePostUpdate = async (postId: number) => {
    let userId = 1;
    SetIsUpdating(true);
    await fetch(
      `http://localhost:8080/api/posts/user/${userId}/post/${postId}/update?newTitle=${postData.title}&newContent=${postData.content}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then(() => {
        SetIsEditing(false);
        getPost();
      })
      .catch((err) => SetError(err.message))
      .finally(() => SetIsUpdating(false));
  };

  //handle delete post
  const handleDeletePost = async (postId: number) => {
    let userId = 1;
    await fetch(
      `http://localhost:8080/api/posts/user/${userId}/post/${postId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        navigate("/");
      })
      .catch((err) => SetError(err.message));
  };

  //calls get post on page load
  useEffect(() => {
    getPost();
  }, []);

  //update post data once post has been fetched using getPost funtion
  useEffect(() => {
    if (post)
      setPostData({
        content: post.content,
        title: post.title,
      });
  }, [post]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  if (post)
    return (
      <div>
        {!isEditing ? (
          <div>
            <h1>{post.title}</h1>
            <h1>{post.content}</h1>
            <button onClick={() => SetIsEditing(true)}>Edit</button>
            <button onClick={()=>handleDeletePost(post.id)}>Delete</button>
          </div>
        ) : (
          <div>
            <div>
              <input
                //update the title in the postData
                onChange={(e) =>
                  setPostData((prev) => {
                    return { ...prev, title: e.target.value };
                  })
                }
                value={postData.title}
                type="text"
                id="title"
              />
            </div>

            <div>
              <textarea
                //update the content in the postData
                onChange={(e) =>
                  setPostData((prev) => {
                    return { ...prev, content: e.target.value };
                  })
                }
                value={postData.content}
                rows={6}
                id="content"
              />
            </div>
            <div>
              <button disabled={isUpdating} onClick={handleCanelEdit}>
                Cancel
              </button>
              <button
                disabled={isUpdating}
                onClick={() => handlePostUpdate(post.id)}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
};

export default PostInfo;
