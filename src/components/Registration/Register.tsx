import React, { useState } from 'react';
import "./Register.css";
import RevconnectLogo from '../assets/Revconnect.png'

/**
 * This file to register new user into databse with API calling as well.
 * @returns
 */
const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [userNameExists, setUserNameExists] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

/**
 * This function call API to check is the userName which user is entering is exists in database as duplicate userName is not allowed.
 * This function will call on every change 
 * @param text - Text which is passing by user on every change
 */
const checkUserName = (text: String): void => {
  const BASE_URL = "http://localhost:8080/checkUserId";

  var formData: FormData = new FormData();
  formData.append("userName",text.trim().toString())

  const requestOptions: RequestInit = {
      method: 'POST',
      redirect: 'follow',
      body:formData
  };

  /**
   * fetch method is to call API, need URL to call, need to padd method type, can accept formdata
   * Can fetch reposne in .then method for reponse from api in return. 
   * Can alo catch exception as well.
   */
  fetch(BASE_URL, requestOptions)
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
      console.log("API Response (boolean):", data);  // Log the boolean response
      if (data) {
        console.log("Username exists.");
        setUserNameExists(true);
        alert("Username already exists.");
      } 
      else{
        setUserNameExists(false);
      }
    })
    .catch(error => console.log('Error:', error));
}

/**
 * 
 * Check for all validation before submitting
 * If passes all checks then call api function to register user.
 */
const validations = (): void =>{
  
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(userNameExists){
    alert("Username is already exists!")
  }
  else if ( !re.test(email) ) {
     alert("Email is incorrect!")
  }
  else if(password.length < 8)
  {
    alert("Password must be 8 charcter long!")
  }
  else if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  else{
    registerUser();
  }
}

/**
 * This function does API calling for register user into database after most of the validations done.
 * Get reponse in back with reposne status code if registration has completed and shows alert if succecced and shows error if any issue.
 * 
 * Double checks if user already exists with boolean parameter
 * Add user information into formdata to pass into API
 * Passes method type in options as well.
 */
const registerUser = (): void => {
  const BASE_URL = "http://localhost:8080/register";

  var formData: FormData = new FormData();
  formData.append("firstName",firstname)
  formData.append("lastName",lastname)
  formData.append("userName",username)
  formData.append("email",email)
  formData.append("password",password)
  formData.append("isBusiness","false")

  console.log("User FormData: ", formData);

  const requestOptions: RequestInit = {
      method: 'POST',
      redirect: 'follow',
      body:formData
  };
  fetch(BASE_URL, requestOptions)
  .then(async response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const responseData = await response.text();
          console.log("Registered User:", responseData);
          setUserNameExists(true);
          alert("Registration successful!");
          console.log("Registered User Data:", responseData);
        })
        .catch(error => {
          console.log('Error:', error);
          alert("Registration failed. Please try again.");
        });
    
}
 
/**
 * This is main entry point of page which builds User INterfcae to interact with user to get inputs from them
 * Includes field for UserName
 *                    Email
 *                    Password
 *                    Confirm Password
 *                    FirstName
 *                    LastName
 *                    CheckBox for Business Account
 *                    Register Button to call API
 */
  return (
    <div >
      <img src={RevconnectLogo} alt="RevConnect Logo" width={"32%"} height={"4%"}/>
      <h1>Welcome to RevConnect!</h1>
      <h1>Register Here!</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            checkUserName(e.target.value);
          }}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="accountType" style={{ marginRight: '10px' }}>Business Account:</label>
        <input type="checkbox" id="accountType" name="accountType" value="true" style={{ marginRight: '130px' }} />
      </div>

      <button type="submit" name='submitButton' onClick={validations}>Register</button>
    </form>
    </div>
  );
};

export default Register;