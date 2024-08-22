import React from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ForgotPassword from './components/Forgotpassword';
import ResetPassword from './components/ResetPassword';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/login" element={<Login />} />         
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />

          
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};




export default App;
