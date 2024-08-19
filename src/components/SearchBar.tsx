import React, { ChangeEvent } from 'react';

export interface SearchBarProps {
  searchQuery: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchResults: Array<{
    id: number;
    username: string;
    isSameUser: boolean;
    hasPendingRequest: boolean;
  }>;
  handleSendConnectionRequest: (recipientId: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  handleSearchChange,
  searchResults,
  handleSendConnectionRequest,
}) => (
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
            {user.isSameUser ? (
              <span className="info-text">This is you</span>
            ) : user.hasPendingRequest ? (
              <span className="info-text">Request already sent</span>
            ) : (
              <button
                className="send-request-btn"
                onClick={() => handleSendConnectionRequest(user.id)}
              >
                Send Request
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default SearchBar;
