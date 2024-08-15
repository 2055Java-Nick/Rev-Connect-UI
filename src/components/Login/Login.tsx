
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

// const handleSubmit = (event: React.FormEvent) => { 
//     event.preventDefault();    
//     const validationErrors = ValidateLoginForm (username, password);    
//     if(Object.keys (validationErrors).length === 0) {
//         onSubmit(username, password); 
//         setSuccessMessage(true);
//     }
//     else{ 
//         setErrors(validationErrors); 
//     } 
// };


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
                {/* <p style={{color: "red"}}>{successMessage}</p> */}
                
                <div className="mb-3" >
                    {errors.username && <div className='text-danger'>{errors.username}</div>}
                    <label htmlFor="username" className='form-label'>Username: </label>
                    <input onChange={(e) => setUsername(e.target.value)}
                    type="text" className ="form-control" id="username" placeholder='Enter your username' name="username" 
                    />
                </div>
                <div className="mb-3" >
                    {errors.password && <div className='text-danger'>{errors.password}</div>}
                    <label htmlFor="password" className='form-label'>Password: </label>
                    <input onChange={(e) => setPassword(e.target.value)}
                    type="password" className ="form-control" id="password" placeholder='Enter your password' name="password" 
                    />
                </div>

                <button className="btn btn-lg btn primary" type="submit"  >
                    Login
                </button>
            </form>

        </div>
      
    </div>
  )
}

export default Login

