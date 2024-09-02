import { useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";

export function usePostsContext() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePostsContext must be used within a PostsProvider");
  }
  return context;
}
