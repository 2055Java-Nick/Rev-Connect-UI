
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./routes";
import { useState } from 'react'
import{ BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import { UserProvider } from './components/Context/UserContext';
import Login from "./components/Login/Login";
import ForgotPassword from './components/Login/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword/ResetPassword';
import BusinessProfile from './components/BusinessProfile/BusinessProfile';



export default function App() {

  return (
    <>
    {/* <Login/> */}
      {/* <AuthProvider> */}
        <UserProvider >
          <RouterProvider router={router} fallbackElement={<p>Loading</p>} />
          <BrowserRouter >
            <Routes >
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/*" element={<ResetPassword />} />
              {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      
              <Route path="/profile/business/:id" element={ <BusinessProfile /> } />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      {/* </AuthProvider> */}

        
    </>
  )
}

