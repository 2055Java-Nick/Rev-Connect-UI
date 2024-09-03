import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./routes";
import { PostsProvider } from "./contexts/PostsContext";

export default function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <RouterProvider router={router} fallbackElement={<p>Loading</p>} />
      </PostsProvider>
    </AuthProvider>
  );
}
