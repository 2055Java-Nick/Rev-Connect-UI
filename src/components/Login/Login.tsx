import React, { useState, useEffect } from 'react';
import { ValidateLoginForm, ValidationError } from '../validation/loginValidation';
import { useUser } from '../Context/UserContext';
import axios from 'axios';

const Login= () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<ValidationError>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state for API error messages
    const { user, setUser } = useUser(); // Extract user along with setUser

    useEffect(() => {
        console.log('User context:', user);
    }, [user]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const validationErrors = ValidateLoginForm(username, password);
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            setErrorMessage(null);
            try {
                const response = await axios.post('http://localhost:8080/login', null, {
                    params: {
                        userId: username,
                        password: password,
                    },
                });

                if (response.data) {
                    console.log(response.data);
                    setUser(response.data); // Update user context
                    setSuccessMessage('Login successful!');
                } else {
                    setErrorMessage('Login failed. Please try again.');
                }
            } catch (error) {
                setErrorMessage('An error occurred. Please try again later.');
                console.error(error);
            }
        } else {
            setErrors(validationErrors);
            setSuccessMessage(null);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center login-background'>
            <div className="container col-md-4 col-sm-12">
                {successMessage && <p style={{ color: "green" }} className="success-message">{successMessage}</p>}
                {errorMessage && <p style={{ color: "red" }} className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        {errors.username && <div className='text-danger'>{errors.username}</div>}
                        <label htmlFor="username" className='form-label'>Username: </label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder='Enter your username'
                            name="username"
                        />
                    </div>
                    <div className="mb-3">
                        {errors.password && <div className='text-danger'>{errors.password}</div>}
                        <label htmlFor="password" className='form-label'>Password: </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder='Enter your password'
                            name="password"
                        />
                    </div>
                    <button className="btn btn-lg btn-primary" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
