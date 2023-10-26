import React, { useEffect, useState } from 'react';
import './PaymentLoadingPage.css'; // Import the CSS file for LoadingPage

const PaymentLoadingPage = () => {
  const [isPaymentLoading, setIsLoading] = useState(true);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  useEffect(() => {
    // Simulate loading for 4 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // After 2 seconds, set isPaymentSuccess to true
    const successTimeout = setTimeout(() => {
      setIsPaymentSuccess(true);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(successTimeout);
    };
  }, []);

  return (
    <div className="loading-page-container">
      {isPaymentLoading ? (
        <div className="loading-content">
          <h2>Please don't press any key during the transaction is getting processed</h2>
          <p>Please wait...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="loading-success">
          {isPaymentSuccess ? (
            <>
              <h4>Payment Successful!</h4>
              <h3>Ticket Booked Successfully</h3>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PaymentLoadingPage;
