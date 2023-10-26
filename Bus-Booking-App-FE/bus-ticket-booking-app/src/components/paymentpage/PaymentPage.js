import React, { useState } from 'react';
import PaymentLoadingPage from '../loadingpage/PaymentLoadingPage';
import MyTripPage from '../mytrippage/MyTripPage';
import './PaymentPage.css'; // Import the CSS file for PaymentPage

const PaymentPage = ({ formData, selectedBus, selectedDate }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedUpiSubOption, setSelectedUpiSubOption] = useState('');

  const [loading, setLoading] = useState(false); // State to manage loading/waiting page
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const [ticket, setTicket] = useState(null); // State to store the ticket data

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubOptionChange = (option) => {
    setSelectedUpiSubOption(option);
  };

  const handlePayment = () => {
    setLoading(true); // Show loading/waiting page
    // Simulate a delay of 3 seconds before showing the payment page
    setTimeout(() => {
      setShowPaymentPage(true);
    }, 4000);
  };

  const bookTicket = async () => {
    // Define the request body
    const requestBody = {
      bus: {
        busId: selectedBus.busId,
        busNumber: selectedBus.busNumber,
        busName: selectedBus.busName,
        noOfSeats: selectedBus.noOfSeats,
        category: selectedBus.category,
        dropTime: selectedBus.dropTime,
        departureTime: selectedBus.departureTime,
        origin: selectedBus.origin,
        destination: selectedBus.destination,
        runsOnWeekDays: selectedBus.runsOnWeekDays,
        ticketPrice: selectedBus.ticketPrice,
      },
      noOfSeats: formData.numberOfSeats,
      dateOfJourney: selectedDate,
      customerName: formData.name,
      customerId: 0, // Default value for guest user
    };

    // Retrieve customerData from session storage
    const customerData = JSON.parse(sessionStorage.getItem('customerData'));
    
    if (customerData) {
      // If customerData is available, extract the customerId
      requestBody.customerId = customerData.customerId;
    }

    try {
      // Make the API call
      const response = await fetch('http://localhost:8001/customer/bookticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response JSON
      const data = await response.json();
      setTicket(data); // Store the ticket data
      
      // Store the ticket in localStorage
      localStorage.setItem('myTicket', JSON.stringify(data));

    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  if (showPaymentPage) {
    // Show the payment page component when showPaymentPage is true
    return <MyTripPage />;
  }

  if (loading) {
    // Show the loading/waiting page component when loading is true
    return <PaymentLoadingPage />;
  }

  return (
    <div className="payment-page-container">
      <div className="payment-page">
        <h2 className="payment-title">Payment Gateway</h2>
        <div className="payment-amount">
          <p>Total Amount to Pay: {selectedBus.ticketPrice} /-Rs</p>
        </div>
        <div className="payment-options">
          <div className="payment-option">
            <input
              type="radio"
              id="upi"
              name="paymentOption"
              value="UPI"
              checked={selectedOption === 'UPI'}
              onChange={handleOptionChange}
            />
            <label htmlFor="upi">UPI</label>
            {selectedOption === 'UPI' && (
              <div className="upi-options">
                <div className="upi-sub-options">
                  <input
                    type="radio"
                    id="gpay"
                    name="upiSubOption"
                    value="Google Pay (Gpay)"
                    checked={selectedUpiSubOption === 'Google Pay (Gpay)'}
                    onChange={() => handleSubOptionChange('Google Pay (Gpay)')}
                  />
                  <label htmlFor="gpay">Google Pay</label>
                  <input
                    type="radio"
                    id="paytm"
                    name="upiSubOption"
                    value="Paytm"
                    checked={selectedUpiSubOption === 'Paytm'}
                    onChange={() => handleSubOptionChange('Paytm')}
                  />
                  <label htmlFor="paytm">Paytm</label>
                  <input
                    type="radio"
                    id="phonePe"
                    name="upiSubOption"
                    value="PhonePe"
                    checked={selectedUpiSubOption === 'PhonePe'}
                    onChange={() => handleSubOptionChange('PhonePe')}
                  />
                  <label htmlFor="phonePe">PhonePe</label>
                  <input
                    type="radio"
                    id="amazonPay"
                    name="upiSubOption"
                    value="Amazon Pay"
                    checked={selectedUpiSubOption === 'Amazon Pay'}
                    onChange={() => handleSubOptionChange('Amazon Pay')}
                  />
                  <label htmlFor="amazonPay">Amazon Pay</label>
                </div>
              </div>
            )}
          </div>
          <div className="payment-option">
            <input
              type="radio"
              id="debitCard"
              name="paymentOption"
              value="Debit/Credit Card"
              checked={selectedOption === 'Debit/Credit Card'}
              onChange={handleOptionChange}
            />
            <label htmlFor="debitCard">Debit/Credit Card</label>
          </div>
        </div>
        <button className="pay-button" onClick={() => { handlePayment(); bookTicket(); }}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
