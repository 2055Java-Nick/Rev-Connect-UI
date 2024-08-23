import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <h2>Login</h2>
      {/* Add your login form here */}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
