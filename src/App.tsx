import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Register'

const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to RevConnect!</h1>
      <h1>Register Here!</h1>
      <Register />
    </div>
  );
};

export default App
