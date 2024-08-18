
import axios from 'axios';
import { useState } from 'react';
 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
 
    setIsSubmitting(true);
    setMessage('');
 
    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
 
      const response = await axios.post('http://localhost:8080/forgot-password', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response)
      setMessage(response.data.message || 'Password reset link sent to your email.');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage('Invalid email!');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className="container col-md-4 col-sm-12">
        {message && (
          <p className={`text-${message.includes('error') || message.includes('An error occurred') ? 'danger' : 'success'}`}>
            {message}
          </p>
        )}
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
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Submitting...
              </>
            ) : (
              'Request Password Reset'
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;
 

