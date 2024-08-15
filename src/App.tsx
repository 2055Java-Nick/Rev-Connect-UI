import './App.css';
import React, { useState, ChangeEvent } from 'react';
import userPic from './assets/user.jpg';

interface User {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const results = mockSearchUsers(e.target.value);
    setSearchResults(results);
  };

  const mockSearchUsers = (query: string): User[] => {
    return query
      ? [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Kate Smith' },
      ]
      : [];
  };

  return (
    <div className="dashboard">
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

      <main className="main-content">
        {/* Search Section */}
        <section className="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <ul className="search-results">
            {searchResults.map((user) => (
              <li key={user.id}>
                <div className="result-details">
                  <span className="username">{user.name}</span>
                </div>
                <div className="actions">
                  <button className="send-request-btn">Send Request</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="pending-requests">
          <h2>Pending Connection Requests</h2>
          <ul>
            <li>
              <div className="request-details">
                <img src={userPic} alt="User Name" className="profile-pic" />
                <span className="username">Natnael Lema</span>
              </div>
              <div className="actions">
                <button className="accept-btn">Accept</button>
                <button className="reject-btn">Reject</button>
              </div>
            </li>
          </ul>
        </section>

        <section className="my-connections">
          <h2>My Connections</h2>
          <ul>
            <li>
              <div className="connection-details">
                <img src={userPic} alt="User Name" className="profile-pic" />
                <span className="username">Gautam Lalwani</span>
              </div>
              <div className="actions">
                <button className="message-btn">Message</button>
                <button className="remove-btn">Remove</button>
              </div>
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Revature. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/about">About</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </footer>
    </div>
  );
};

export default App;
