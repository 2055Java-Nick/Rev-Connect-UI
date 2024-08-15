import { useState } from 'react'

import{ BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from "./components/Login";

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
      </Routes>
      </BrowserRouter>

        

    </>
  )
}

export default App;
