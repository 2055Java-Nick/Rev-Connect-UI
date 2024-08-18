import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
 
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
 
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
 
    if (!token) {
      setMessage('Invalid token.');
      return;
    }
 
    setIsSubmitting(true);
    setMessage('');
 
    try {
      const formData = new URLSearchParams();
      formData.append('password', password);
 
      const response = await axios.put(`http://localhost:8080/reset-password?token=${token}`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
 
      if (response.data === "Your password has been successfully updated.") {
        navigate('/login', { state: { successMessage: 'Your password has been successfully updated. Please log in with your new password.' } });
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      setMessage('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
<div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
<div className="container col-md-4 col-sm-12">
        {message && <p className={`text-${message.includes('error') || message.includes('An error occurred') || message.includes('Invalid token') ? 'danger' : 'success'}`}>{message}</p>}
<form onSubmit={handleSubmit}>
<div className="mb-3">
<label htmlFor="password" className='form-label'>New Password: </label>
<input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              disabled={isSubmitting}
            />
</div>
<div className="mb-3">
<label htmlFor="confirmPassword" className='form-label'>Confirm Password: </label>
<input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              required
              disabled={isSubmitting}
            />
</div>
<button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Reset Password'}
</button>
</form>
</div>
</div>
  );
}
 
export default ResetPassword;