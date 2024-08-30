import { createBrowserRouter } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import LoginPage from "../components/LoginPage/LoginPage";
import Layout from "../pages/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import PartnerChannelsForm from "../components/PartnerChannels/PartnerChannelsForm";

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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
  {
    path: "/partner-channels",
    element: <PartnerChannelsForm />
  }
]);
