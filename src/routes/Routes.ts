import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import App from "../App";
import ViewPosts from "../pages/Posts";

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
      {
        path: "/posts/:id",
        Component: ViewPosts,
      },
    ],
  },
]);

export default router;
