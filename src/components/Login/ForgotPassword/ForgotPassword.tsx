// ForgotPassword.js
import { useState } from 'react';
import axios from 'axios';
 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/forgot-password', { email });
      setMessage(response.data);
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
            <label htmlFor="email" className='form-label mb-0 me-2'>Email: </label>
            </div>
            <div className="col-auto">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
              placeholder='Enter your email'
              name="email"
            />
            </div>
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Request Password Reset
          </button>
        </form>
        
      </div>
    </div>
  );
};
 
export default ForgotPassword;