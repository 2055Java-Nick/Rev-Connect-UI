
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LandingPage from './pages/LandingPage/LandingPage';
import Profile from './components/Profile'
import './App.css'; // Import the CSS file

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/landing/:name" element={<LandingPage />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/" element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;