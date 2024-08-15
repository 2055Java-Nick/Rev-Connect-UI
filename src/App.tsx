// src/App.tsx
import './App.css';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { sendConnectionRequest, getPendingConnectionRequests, findConnectionsByUserId, acceptConnectionRequest, rejectConnectionRequest,searchUser } from './services/api/connections.service';
import userPic from './assets/user.jpg';
import axios from 'axios'

interface User {
  id: number;
  username: string;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<User[]>([]);
  const [myConnections, setMyConnections] = useState<User[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchPendingRequests();
      fetchMyConnections();
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const response = await axios.get('/api/getUserId');
      setUserId(response.data.userId);
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      try {
        const response = await searchUser(query);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching users:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const fetchPendingRequests = async () => {
    if (userId !== null) {
      try {
        const data = await getPendingConnectionRequests(userId);
        setPendingRequests(data.map((req: any) => ({ id: req.requester.id, username: req.requester.username })));
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    }
  };

  const fetchMyConnections = async () => {
    if (userId !== null) {
      try {
        const data = await findConnectionsByUserId(userId);
        setMyConnections(data.map((conn: any) => ({ id: conn.recipient.id, username: conn.recipient.username })));
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    }
  };

  const handleSendConnectionRequest = async (recipientId: number) => {
    if (userId !== null) {
      try {
        await sendConnectionRequest(userId, recipientId);
        fetchPendingRequests(); 
      } catch (error) {
        console.error('Error sending connection request:', error);
      }
    }
  };

  const handleAcceptRequest = async (requestId: number) => {
    try {
      await acceptConnectionRequest(requestId);
      fetchPendingRequests(); 
      fetchMyConnections();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (requestId: number) => {
    try {
      await rejectConnectionRequest(requestId);
      fetchPendingRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
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
                  <span className="username">{user.username}</span>
                </div>
                <div className="actions">
                  <button className="send-request-btn" onClick={() => handleSendConnectionRequest(user.id)}>Send Request</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="pending-requests">
          <h2>Pending Connection Requests</h2>
          <ul>
            {pendingRequests.map((user) => (
              <li key={user.id}>
                <div className="request-details">
                  <img src={userPic} alt={user.username} className="profile-pic" />
                  <span className="username">{user.username}</span>
                </div>
                <div className="actions">
                  <button className="accept-btn" onClick={() => handleAcceptRequest(user.id)}>Accept</button>
                  <button className="reject-btn" onClick={() => handleRejectRequest(user.id)}>Reject</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="my-connections">
          <h2>My Connections</h2>
          <ul>
            {myConnections.map((user) => (
              <li key={user.id}>
                <div className="connection-details">
                  <img src={userPic} alt={user.username} className="profile-pic" />
                  <span className="username">{user.username}</span>
                </div>
                <div className="actions">
                  <button className="message-btn">Message</button>
                  <button className="remove-btn">Remove</button>
                </div>
              </li>
            ))}
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
