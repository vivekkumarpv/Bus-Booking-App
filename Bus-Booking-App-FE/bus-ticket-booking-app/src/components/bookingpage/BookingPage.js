import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingPage from '../loadingpage/LoadingPage';
import PaymentPage from '../paymentpage/PaymentPage';
import './BookingPage.css'; // Import the CSS file for BookingPage

const BookingPage = () => {
    
  const location = useLocation();
  const { selectedBus, selectedDate } = location.state || {}; // Destructure selectedBus and selectedDate
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '', // Default gender to 'Male'
    phoneNumber: '',
    numberOfSeats: '',
  });

  // State variables for fare summary
  const [ticketFare, setTicketFare] = useState(selectedBus.ticketPrice);
  const [discount, setDiscount] = useState(0);
  const [totalFare, setTotalFare] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0.05);

  const [loading, setLoading] = useState(false); // State to manage loading/waiting page
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (selectedBus.ticketPrice <= 250) {
      setDiscountPercent(0.05);
    } else if (selectedBus.ticketPrice > 250 && selectedBus.ticketPrice <= 500) {
      setDiscountPercent(0.1);
    }

    // Calculate fare summary based on the number of seats entered
    if (name === 'numberOfSeats') {
      const seats = parseInt(value, 10);
      const fare = selectedBus.ticketPrice * seats;
      const calculatedDiscount = fare * discountPercent; // 10% discount for this example
      const calculatedTotalFare = fare - calculatedDiscount;

      setTicketFare(fare);
      setDiscount(calculatedDiscount);
      setTotalFare(calculatedTotalFare);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show loading/waiting page
    // Simulate a delay of 3 seconds before showing the payment page
    setTimeout(() => {  
      setShowPaymentPage(true);
    }, 3000);
  };

  if (showPaymentPage) {
    // Show the payment page component when showPaymentPage is true
    return <PaymentPage
    formData={formData}
    selectedBus={selectedBus}
    selectedDate={selectedDate}
  />;
  }

  if (loading) {
    // Show the loading/waiting page component when loading is true
    return <LoadingPage />;
  }

  if (!selectedBus || !selectedDate) {
    return (
      <div className="booking-page-container">
        <div className="booking-page">
          <h2 className="booking-title">Error: Bus details not found.</h2>
          {/* You can add a link or button to navigate back to the previous page */}
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      <div className="booking-page">
        <h2 className="booking-title">Book Ticket</h2>
        <p className="bus-info">From: {selectedBus.destination}</p>
        <p className="bus-info">To: {selectedBus.origin}</p>
        <p className="bus-info">Date of Journey: {selectedDate}</p>
        <p className="bus-info">
          Departure Time: {selectedBus.departureTime} -------------------------------- Drop Time:{' '}
          {selectedBus.dropTime}
        </p>
        <h4 className="passenger-details-heading">Passenger Details</h4>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="input-box"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="input-box"
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age"
              required
              min="1" // Set the minimum age to 1
            />
          </div>
          <div className="form-group">
  <select
    className="input-box"
    id="gender"
    name="gender"
    value={formData.gender}
    onChange={handleInputChange}
    required
  >
    <option value="" disabled hidden>Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Others">Others</option>
  </select>
</div>

          <div className="form-group">
            <input
              className="input-box"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              pattern="^[1-9][0-9]{9}$"
              required
              title="Please enter a valid 10-digit phone number & not start with 0."
              
            />
          </div>
          <div className="form-group">
            <input
              className="input-box"
              type="number" // Use "number" type for numeric input
              id="numberOfSeats"
              name="numberOfSeats"
              value={formData.numberOfSeats}
              onChange={handleInputChange}
              placeholder="Number of Seats Required"
              required
              min="1" // Set the minimum age to 1
              max={selectedBus.noOfSeats}
            />
          </div>
          {/* Add other fields as needed */}
          <div className="form-group">
            <button type="submit" className="book-now-btn">
              Proceed To Payment
            </button>
          </div>
        </form>
      </div>

      {/* Fare Summary Container */}
      <div className="fare-summary-container">
        <h4 className="fare-summary-heading">Fare Summary</h4>
        <div className="fare-summary-item">
          <span>Ticket Fare : </span>
          <span className="value"> {ticketFare} /-Rs</span>
        </div>
        <div className="fare-summary-item">
          <span>Discount : </span>
          <span className="value"> {discount}</span>
        </div>
        <hr className="fare-summary-divider" />
        <div className="fare-summary-item">
          <span>
            <h5>Total Fare : </h5>
          </span>
          <span className="value"> {totalFare} /-Rs</span>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
