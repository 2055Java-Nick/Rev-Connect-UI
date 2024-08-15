import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import App from "../App";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  //TODO: figure out how we are storing token/logincreds/etc.
  //const isAuthenticated = localStorage.getItem('authToken') !== null;
};

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
    ],
  },
]);

export default router;
