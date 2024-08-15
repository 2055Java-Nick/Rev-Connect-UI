<div className="dashboard">
  <header>
    <h1>Connections Dashboard</h1>
    <nav>
      <a href="/home">Home</a>
      <a href="/profile">Profile</a>
      <a href="/messages">Messages</a>
    </nav>
  </header>

  <section className="pending-requests">
    <h2>Pending Connection Requests</h2>
    <ul>
      <li>
        <div className="request-details">
          <img src="profile-pic.jpg" alt="User Name" />
          <span>User Name</span>
        </div>
        {/* <button onclick="acceptRequest(requestId)">Accept</button> */}
        {/* <button onclick="rejectRequest(requestId)">Reject</button> */}
      </li>
    </ul>
  </section>

  <section className="my-connections">
    <h2>My Connections</h2>
    <ul>
      <li>
        <div className="connection-details">
          <img src="profile-pic.jpg" alt="User Name" />
          <span>User Name</span>
        </div>
        {/* <button onClick="sendMessage(connectionId)">Message</button> */}
        {/* <button onclick="removeConnection(connectionId)">Remove</button> */}
      </li>
    </ul>
  </section>
</div>
