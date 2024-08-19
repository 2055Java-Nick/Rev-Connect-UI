import { useState } from 'react'
import{ BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'

import Login from "./components/Login";
import BusinessProfile from './components/BusinessProfile/BusinessProfile'

function App() {

  const handleLoginSubmit = (username: string, password: string) => {
    console.log('Username:', username);
    console.log('Password:', password);
    
};


  return (
    <>
    {/* <Login/> */}
      
      <BrowserRouter >
      <Routes >
      <Route path="/login" element={<Login onSubmit={handleLoginSubmit} />} />
        {/* < Route path="/login" element={<login />} /> */}
        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/" element={ <h1>Routeless Page</h1> } />
        <Route path="/profiles/business/:id" element={ <BusinessProfile /> } />
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
