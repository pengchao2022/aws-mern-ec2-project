import React, { useState, useEffect } from 'react';

const Dashboard = ({ user, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard">
      <h2>Welcome to Your Dashboard</h2>
      <p className="welcome-message">
        Hello, <strong>{user.username}</strong>! You're successfully logged in.
      </p>
      
      <div className="user-info">
        <h3>User Information</h3>
        <div className="user-details">
          <div className="user-detail">
            <span className="detail-label">User ID:</span>
            <span className="detail-value">{user.id}</span>
          </div>
          <div className="user-detail">
            <span className="detail-label">Username:</span>
            <span className="detail-value">{user.username}</span>
          </div>
          <div className="user-detail">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          {user.createdAt && (
            <div className="user-detail">
              <span className="detail-label">Member Since:</span>
              <span className="detail-value">{formatDate(user.createdAt)}</span>
            </div>
          )}
          <div className="user-detail">
            <span className="detail-label">Current Time:</span>
            <span className="detail-value">{currentTime.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <button 
          className="btn btn-secondary" 
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      
      <div className="dashboard-features">
        <h4>Available Features:</h4>
        <ul style={{ textAlign: 'left', marginTop: '1rem', color: '#666' }}>
          <li>User authentication</li>
          <li>Profile management</li>
          <li>Secure session handling</li>
          <li>JWT token-based security</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;