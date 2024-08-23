import React from 'react';
import { useRoutes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LandingPage from './components/LandingPage/LandingPage';
import './App.css'; // Import the CSS file

// Define the App component
const App: React.FC = () => {
  // Define the routes using useRoutes hook
  const routes = useRoutes([
    { path: '/', element: <RegistrationForm /> },
    { path: '/landing/:name', element: <LandingPage /> },
  ]);

  return routes; // Return the routes to be rendered
};

export default App; // Export the App component as default