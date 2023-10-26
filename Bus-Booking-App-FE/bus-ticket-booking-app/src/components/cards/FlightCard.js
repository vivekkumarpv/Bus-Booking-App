import React from 'react';
import './FlightCard.css'; // You can create a CSS file for styling

const FlightCard = ({ flight, from, to, flightClass, onBookNow }) => {
  const {
    date,
    origin,
    destination,
    searchResults
  } = flight;

  return (
    <div className="flight-card">
      <div className="flight-details">
        <div>
          <span>Date: {date}</span>
        </div>
        <div>
          <span>From: {origin}</span>
        </div>
        <div>
          <span>To: {destination}</span>
        </div>
      </div>
      <div className="flight-class">
        <div>
          <div className="flight-class-list">
            {searchResults.map((bus) => (
              <div key={bus.busId}>
                <span>Bus Name: {bus.busName}</span>
                <span>Bus Number: {bus.busNumber}</span>
                <span>Category: {flightClass}</span>
                <span>No. of Seats: {bus.noOfSeats}</span>
                <span>Departure Time: {bus.departureTime}</span>
                <span>Drop Time: {bus.dropTime}</span>
                <span>Ticket Price: {bus.ticketPrice}/-Rs</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="view-details-button">
  <button onClick={() => onBookNow(flight)}>Book Now</button>
</div>
    </div>
  );
};

export default FlightCard;
