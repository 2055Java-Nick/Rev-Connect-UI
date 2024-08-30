import React from 'react';
import { useParams } from 'react-router-dom';

type Params = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
};

const LandingPage: React.FC = () => {
  const { firstname, lastname, email, username } = useParams<Params>();

  return (
    <div>
      <h1>Welcome, {firstname}!</h1>
      <h2>Thank you for registering. We're glad to have you here.</h2>
      <p>Your email is {email}</p>
      <p>Your username is {username}</p>
      <p>Your last name is {lastname}</p>
    </div>
  );
};

export default LandingPage;