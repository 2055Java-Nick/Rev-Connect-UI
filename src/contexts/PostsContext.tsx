import { createContext, ReactNode, useState } from "react";
import { useFetchPosts } from "../hooks/useFetchPosts";
import { PostUpdate } from "../types/postTypes";
import { useCreatePost } from "../hooks/useCreatePost";
import { useUpdatePost } from "../hooks/useUpdatePost";
import { useDeletePost } from "../hooks/useDeletePost";
import { PostContextProps } from "../types/props";

export const PostsContext = createContext<PostContextProps | undefined>(
  undefined,
);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<number | undefined>(0);
  const { posts, refetchPosts, loading, error } = useFetchPosts(page);
  const { handleCreatePost } = useCreatePost();
  const { handleUpdatePost } = useUpdatePost();
  const { handleDeletePost } = useDeletePost();

  function previousPage() {
    if (page != undefined && page > 0) setPage(page - 1);
  }
  function nextPage() {
    if (page != undefined) setPage(page + 1);
  }

  async function createPost(post: PostUpdate) {
    const response = await handleCreatePost(post);
    refetchPosts();
    return response;
  }

  async function updatePost(post: PostUpdate) {
    const response = await handleUpdatePost(post);
    refetchPosts();
    return response;
  }

  async function deletePost(postId: number) {
    await handleDeletePost(postId);
    refetchPosts();
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        error,
        createPost,
        updatePost,
        deletePost,
        refetchPosts,
        page,
        goToPreviousPage: previousPage,
        goToNextPage: nextPage,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
