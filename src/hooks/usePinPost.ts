/*
export function handlePinPost = async (postId: number, isPinned: boolean) => {
  const formData = new FormData();
  // Toggle the isPinned status. If the post is currently not pinned, set "isPinned" to "true", otherwise set it to "false".
  formData.append("isPinned", !isPinned ? "true" : "false");
  await updatePostPin(postId, formData)
    .then((response) => {
      
       * Update the state of posts in the UI by mapping through the current posts.
       * If the postId matches the post that was just updated, update the isPinned property accordingly.
       
      setPosts(
        posts.map((post) =>
          post.postId === postId
            ? { ...post, isPinned: !post.isPinned }
            : post
        )
      );
      console.log(response);
    })
    .then(() => {
      // After updating the pinned status, fetch the posts again to ensure the UI reflects the current state.
      fetchPosts(currentPage);
    })
    .catch((e) => {
      console.log(e);
    });
};
*/

import { useState } from "react";
import { updatePostPin } from "../services/postApi";
import { Post } from "../types/postTypes";
import { ApiError } from "../services/errors";

export function usePinPost() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handlePinPost(post: Post) {
    setLoading(true);
    setError(null);

    try {
      const response = await updatePostPin(post);
    } catch (error) {
      setError(error as ApiError);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  return {
    loading,
    error,
    handlePinPost,
  };
}
