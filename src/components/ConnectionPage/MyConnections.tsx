import React from 'react';
import userPic from '../assets/user.jpg'

export interface MyConnectionsProps {
  myConnections: Array<{
    connectionId: number;
    id: number;
      username: string;
  }>;
  handleRemoveConnection: (connectionId: number) => void;
}

const MyConnections: React.FC<MyConnectionsProps> = ({
  myConnections,
  handleRemoveConnection,
}) => (
  <section className="my-connections">
    <h2>My Connections</h2>
    <ul>
      {myConnections.map((user) => (
        <li key={user.connectionId}>
          <div className="connection-details">
            <img src={userPic} alt={user.username} className="profile-pic" />
            <span className="username">{user.username}</span>
          </div>
          <div className="actions">
            <button className="message-btn">Message</button>
            <button className="remove-btn" onClick={() => handleRemoveConnection(user.connectionId)}>
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default MyConnections;
