// LoadingPage.js

import React, { useEffect, useState } from 'react';
import './LoadingPage.css'; // Import the CSS file for LoadingPage

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 4 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <div className="loading-page-container">
      {isLoading ? (
        <div className="loading-content">
          <h2>Proceeding to Payment Gateway</h2>
          <p>Please wait...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="loading-success">
          <h2>Payment Successful!</h2>
          <p>Thank you for your payment.</p>
        </div>
      )}
    </div>
  );
};

export default LoadingPage;
