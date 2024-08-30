import { createBrowserRouter } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import LoginPage from "../components/LoginPage/LoginPage";
import Layout from "../pages/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import EditProfile from "../components/EditProfile/EditProfile"; // Import the EditForm component
import LandingPage from "../pages/LandingPage/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Layout />,
      },
    ],
  },
  {
    path: "/users/login",
    element: <LoginPage />,
  },
  {
    path: "/users/register",
    element: <RegistrationForm />,
  },
  {
    path: "/users/edit-profile", // Add route for EditForm
    element: <EditProfile />,
  },
  {
    path: "/users/:id",
    element: <LandingPage />,
  },
]);
