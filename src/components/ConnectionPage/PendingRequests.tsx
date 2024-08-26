import React from 'react';
import userPic from '../../assets/user.jpg'

export interface PendingRequestsProps {
  pendingRequests: Array<{
    requestId: number;
    id: number;
    username: string;
  }>;
  handleAcceptRequest: (requestId: number) => void;
  handleRejectRequest: (requestId: number) => void;
}

const PendingRequests: React.FC<PendingRequestsProps> = ({
  pendingRequests,
  handleAcceptRequest,
  handleRejectRequest,
}) => (
  <section className="pending-requests">
    <h2>Pending Connection Requests</h2>
    <ul>
      {pendingRequests.map((user) => (
        <li key={user.requestId}>
          <div className="request-details">
            <img src={userPic} alt={user.username} className="profile-pic" />
            <span className="username">{user.username}</span>
          </div>
          <div className="actions">
            <button className="accept-btn" onClick={() => handleAcceptRequest(user.requestId)}>
              Accept
            </button>
            <button className="reject-btn" onClick={() => handleRejectRequest(user.requestId)}>
              Reject
            </button>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default PendingRequests;
