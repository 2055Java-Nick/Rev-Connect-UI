import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loading, error } = useAuthContext();

  const navigate = useNavigate();

  async function handleLogin() {
    await loginUser(username, password);
    navigate("/posts");
  }

  if (error) return <p style={{ color: "red" }}>{error.message}</p>;

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
