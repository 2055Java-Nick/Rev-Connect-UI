import { createBrowserRouter } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import LoginPage from "../components/LoginPage/LoginPage";
import Layout from "../pages/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import CreatePost from "../components/BusinessPosts/CreatePost";
import PostPage from "../components/BusinessPosts/PostPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Layout />,
      },
      { path: "/create-post", element: <CreatePost /> },
      {
        path: "/posts",
        element: <PostPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
]);
