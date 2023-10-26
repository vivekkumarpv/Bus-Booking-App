import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h3>Welcome to Ticketpedia</h3>
        <Link to="/admin">
          <button className="welcome-button">Admin</button>
        </Link>
        <Link to="/user">
          <button className="welcome-button">User</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
