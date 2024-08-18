import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
 
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
 
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (!token) {
      setMessage('Invalid token.');
    }
  }, [location.search]);
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = new URLSearchParams(location.search).get('token');
    try {
      const response = await axios.put('/reset-password', { token, password });
      setMessage(response.data);
      if (response.data === "Your password has been successfully updated.") {
        navigate('/login');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };
 
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className="container col-md-4 col-sm-12">
        {message && <p className='text-danger'>{message}</p>}
        <form onSubmit={handleSubmit}>
            <div className="">
                <div className="d-flex align-items-center p-3">
                    <div className="col-auto">
                        <label htmlFor="password" className='form-label mb-0 me-2'>New Password: </label>
                    </div>
                    <div className="col-auto">
                        <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        />
                    </div>
                </div>
            </div>
            <div className="">
                <div className="d-flex align-items-center p-3">
                    <div className="col-auto">
                        <label htmlFor="password" className='form-label mb-0 me-2'>Confirm Password: </label>
                    </div>
                    <div className="col-auto">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            />
                    </div>
                </div>
            </div>
          
          <button className="btn btn-primary" type="submit">Reset Password</button>
        </form>
        
      </div>
    </div>
  )
}
 
export default ResetPassword;
