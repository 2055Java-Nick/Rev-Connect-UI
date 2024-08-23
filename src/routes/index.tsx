import { createBrowserRouter } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import LoginPage from "../components/LoginPage/LoginPage";
import Layout from "../pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
