import { useAuth } from "../../hooks/useAuth";

const PrivatePostDebugPage = () => {
    const { handleLogin, handleRegister, loading, error } = useAuth();
    
    const doTestUserLogin = async () => {
        console.log("Starting test user login...");
        try {
            await handleLogin("testuser1", "hashed_password");
            console.log("Completed login.")
            console.log("Got token: " + localStorage.getItem("token"))
          } catch (error) {
            console.error('Login failed:', error);
          }
    }
    
    return (
      <div>
        <div>
            <h3>Debug Login Form</h3>
            <button onClick={doTestUserLogin}>Login as test user</button>
        </div>
      </div>
    );
  };

export default PrivatePostDebugPage;