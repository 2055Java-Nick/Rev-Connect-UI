import React from 'react';
import { useParams } from 'react-router-dom';

type Params = {
  name: string;
};

const LandingPage: React.FC = () => {
  const { name } = useParams<Params>();

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <h2>Thank you for registering. We're glad to have you here.</h2>
    </div>
  );
};

export default LandingPage;