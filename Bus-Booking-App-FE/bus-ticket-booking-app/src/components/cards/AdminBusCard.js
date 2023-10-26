import React from 'react';
import './AdminBusCard.css';

const AdminBusCard = ({ bus }) => {
  const {
    busId,  
    busName,
    busNumber,
    category,
    noOfSeats,
    departureTime,
    dropTime,
    ticketPrice,
  } = bus;

  return (
    <div className="admin-bus-card">
      <div className="bus-details">
      <div>
          <span>Bus Id: {busId}</span>
        </div>
        <div>
          <span>Bus Name: {busName}</span>
        </div>
        <div>
          <span>Bus Number: {busNumber}</span>
        </div>
        <div>
          <span>Category: {category}</span>
        </div>
        <div>
          <span>No. of Seats: {noOfSeats}</span>
        </div>
        <div>
          <span>Departure Time: {departureTime}</span>
        </div>
        <div>
          <span>Drop Time: {dropTime}</span>
        </div>
        <div>
          <span>Ticket Price: {ticketPrice}/-Rs</span>
        </div>
      </div>
    </div>
  );
};

export default AdminBusCard;
