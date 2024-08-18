
import { useState } from 'react';
import React from 'react'
import { ValidateLoginForm,ValidationError } from '../validation/loginValidation'

interface LoginFormProps{   
    onSubmit :(username: string, password: string) =>void; }

const Login: React.FC<LoginFormProps> = ({ onSubmit }) =>{
    
const[username, setUsername] = useState<string>('');   
const[password, setPassword] = useState<string>('');   
const[errors, setErrors] = useState<ValidationError>({});
const[successMessage,setSuccessMessage] = useState<string | null>(null);


const handleSubmit = (event: React.FormEvent) => {     
    event.preventDefault();    
    const validationErrors = ValidateLoginForm(username, password);    
    if(Object.keys(validationErrors).length === 0) {      
        onSubmit(username, password);      
        setSuccessMessage('Login successful!');      
        setErrors({}); 
        console.log("login success show here")   
    }
    else{
    setErrors(validationErrors);
    setSuccessMessage(null); 
    } 
};



  return (
    <div className='d-flex justify-content-center align-items-center login-background'>
        <div className="container col-md-4 col-sm-12" >
        {successMessage &&  <p style={{color: "green"}} className="success-message">{successMessage}</p> }
            <form onSubmit={handleSubmit}>
               
                <div className="" >
                    {errors.username && <div className='text-danger'>{errors.username}</div>}
                    <div className="d-flex align-items-center p-3">
                    <div className="col-auto">
                        <label htmlFor="username" className='form-label mb-0 me-2'>Username: </label>
                    </div>
                    <div className="col-auto">
                        <input onChange={(e) => setUsername(e.target.value)}
                        type="text" className ="form-control" id="username" placeholder='Enter your username' name="username" 
                        />
                    </div>
                    </div>
                </div>
                <div className="" >
                    {errors.password && <div className='text-danger'>{errors.password}</div>}
                    <div className="d-flex align-items-center p-3">
                    <div className="col-auto">
                        <label htmlFor="password" className='form-label mb-0 me-2'>Password: </label>
                    </div>
                    <div className="col-auto">
                        <input onChange={(e) => setPassword(e.target.value)}
                        type="password" className ="form-control" id="password" placeholder='Enter your password' name="password" 
                        />
                    </div>
                    </div>
                </div>
                
                
                <button className="btn btn-primary" type="submit"  >
                    Login
                </button>
            </form>
            <a href="/forgot-password">forgot password?</a>

        </div>
      
    </div>
  )
}

export default Login

