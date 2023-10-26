import React from 'react';

const BusCard = ({ bus }) => {
  return (
    <div className="bus-card">
      <h3>{bus.busName}</h3>
      <p>Bus Number: {bus.busNumber}</p>
      <p>Category: {bus.category}</p>
      <p>Available Seats: {bus.noOfSeats}</p>
      <p>Departure Time: {bus.departureTime}</p>
      <p>Drop Time: {bus.dropTime}</p>
      <p>Runs on Weekdays: {bus.runsOnWeekDays.join(', ')}</p>
      <p>Ticket Price: ${bus.ticketPrice}</p>
    </div>
  );
};

export default BusCard;
