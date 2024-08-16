import React, { useState } from 'react';
import "./Register.css";
import RevconnectLogo from '../assets/Revconnect.png'


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

    // Basic validation example
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // const user = {
    //   username,
    //   email,
    //   password,
    //   firstname, 
    //   lastname,
    // };

    // console.log("User registered: ", user);
    // Add your registration logic here (e.g., API call)
  };


const checkUserName = (text: String): void => {
  const BASE_URL = "http://localhost:8080/checkUserId";

  var formData: FormData = new FormData();
  formData.append("userName",text.trim().toString())

  console.log("User FormData: ", text.trim().toString());

  const requestOptions: RequestInit = {
      method: 'POST',
      // headers: myHeaders,
      redirect: 'follow',
      body:formData
  };

  fetch(BASE_URL, requestOptions)
      // .then(response => response.json())  // Changed to .json() for proper parsing
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

const registerUser = (): void => {
  if(userNameExists){
    alert("Username already exists.")
  }
  else{
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
}
  
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

      <button type="submit" name='submitButton' onClick={registerUser}>Register</button>
    </form>
    </div>
  );
};

export default Register;