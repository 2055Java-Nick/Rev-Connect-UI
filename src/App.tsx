//import { useState } from 'react'
import revConnectLogo from './assets/Revconnect.png'
import './App.css'
import RegistrationForm from './RegistrationForm';

function App() {

  return (
    <>
      <div>
        <a href="https://revature.com/" target="_blank">
          <img src={revConnectLogo} className="logo" alt="Revature logo" />
        </a>
      </div>
      <h2>Registration Page</h2>
      <div>

      <RegistrationForm />
    </div>
    </>
  )
}

export default App
