import React from 'react';

const Header: React.FC = () => (
  <header className="header">
    <div className="logo">
      <h1>Connections Dashboard</h1>
    </div>
    <nav className="navigation">
      <a href="/home">Home</a>
      <a href="/profile">Profile</a>
      <a href="/messages">Messages</a>
    </nav>
  </header>
);

export default Header;
