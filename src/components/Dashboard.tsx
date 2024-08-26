import React, { useState, ChangeEvent, useEffect } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import PendingRequests from './PendingRequests';
import MyConnections from './MyConnections';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  sendConnectionRequest,
  getPendingConnectionRequests,
  findConnectionsByUserId,
  acceptConnectionRequest,
  rejectConnectionRequest,
  removeConnection,
  searchUser,
} from '../services/api/connections.service';
import '../styles/Dashboard.css';
import { User } from '../types/user';

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<User[]>([]);
  const [myConnections, setMyConnections] = useState<User[]>([]);
  const userId = 2; // Replace with dynamic user ID logic (e.g., localStorage)

  useEffect(() => {
    fetchPendingRequests();
    fetchMyConnections();
  }, [userId]);

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      try {
        const response = await searchUser(query, userId);
        setSearchResults(response);
      } catch (error) {
        console.error('Error searching users:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const data = await getPendingConnectionRequests(userId);
      const mappedRequests = data.map((req: any) => ({
        requestId: req.connectionId,
        id: req.requester.accountId,
        username: req.requester.username,
      }));
      setPendingRequests(mappedRequests);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const fetchMyConnections = async () => {
    try {
      const data = await findConnectionsByUserId(userId);
      const mappedConnections = data.map((conn: any) => ({
        connectionId: conn.connectionId,
        id:
          conn.recipient.accountId !== userId
            ? conn.recipient.accountId
            : conn.requester.accountId,
        username:
          conn.recipient.accountId !== userId
            ? conn.recipient.username
            : conn.requester.username,
      }));
      setMyConnections(mappedConnections);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const handleSendConnectionRequest = async (recipientId: number) => {
    try {
      if (recipientId !== userId) {
        await sendConnectionRequest(userId, recipientId);
        const recipientName = searchResults.find(user => user.id === recipientId)?.username;
        toast.success(`You have sent a connection request to ${recipientName}!`);
        await fetchPendingRequests();
      } else {
        toast.error("You cannot send a connection request to yourself.");
      }
    } catch (error) {
      toast.error('Error sending connection request.');
      console.error('Error sending connection request:', error);
    }
  };

  const handleAcceptRequest = async (requestId?: number) => {
    if (requestId) {
      try {
        await acceptConnectionRequest(requestId);
        toast.success('Connection request accepted!');
        await fetchPendingRequests();
        await fetchMyConnections();
      } catch (error) {
        toast.error('Error accepting request.');
        console.error('Error accepting request:', error);
      }
    }
  };

  const handleRejectRequest = async (requestId?: number) => {
    if (requestId) {
      try {
        await rejectConnectionRequest(requestId);
        toast.info('Connection request rejected.');
        await fetchPendingRequests();
      } catch (error) {
        toast.error('Error rejecting request.');
        console.error('Error rejecting request:', error);
      }
    }
  };

  const handleRemoveConnection = async (connectionId?: number) => {
    if (connectionId) {
      try {
        await removeConnection(connectionId);
        toast.info('Connection removed.');
        await fetchMyConnections();
      } catch (error) {
        toast.error('Error removing connection.');
        console.error('Error removing connection:', error);
      }
    }
  };

  return (
    <div className="dashboard">
      <ToastContainer />
      <Header />
      <main className="main-content">
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          searchResults={searchResults}
          handleSendConnectionRequest={handleSendConnectionRequest}
        />
        <PendingRequests
          pendingRequests={pendingRequests}
          handleAcceptRequest={handleAcceptRequest}
          handleRejectRequest={handleRejectRequest}
        />
        <MyConnections
          myConnections={myConnections}
          handleRemoveConnection={handleRemoveConnection}
        />
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

export default Dashboard;
