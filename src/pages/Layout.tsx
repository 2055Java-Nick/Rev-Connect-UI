import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Layout() {
  const authContext = useContext(AuthContext);

  return (
    <>
      <nav className="p-3">
        <h1>RevConnect</h1>
        <NavLinks
          token={authContext?.isAuthenticated}
          logoutUser={authContext?.logoutUser}
        />
      </nav>
      <Outlet />
    </>
  );
}
/**
 * @param token Whether user is authenticated, or if a session token is present.
 * @param logoutUser Callback to log out the user.
 * @returns List group of links, conditionally rendered based on auth status.
 */
function NavLinks({
  token,
  logoutUser,
}: {
  token?: boolean;
  logoutUser?: () => void;
}) {
  function links() {
    if (token) {
      return (
        <>
          <Link to="/create-post" className="list-group-item text-center">
            Create a Post
          </Link>
          <button className="list-group-item text-center" onClick={logoutUser}>
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link to="/login" className="list-group-item">
          Login
        </Link>
        <Link to="/register" className="list-group-item">
          Register
        </Link>
      </>
    );
  }

  return <div className="d-line-flex list-group w-25">{links()}</div>;
}
