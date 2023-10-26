import React from 'react';
import './TicketCard.css'; // Import your CSS file

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h2>{ticket.busName}</h2>
      </div>
      <div className="ticket-details">
  <div className="ticket-details-item">
    <span className="pnr-number">PNR No.:</span>
    <span>{ticket.pnrNumber}</span>
  </div>
  <div className="ticket-details-item">
    <span>Date of Journey:</span>
    <span>{ticket.dateOfJourney}</span>
  </div>
  <div className="ticket-details-item">
    <span>Category:</span>
    <span>{ticket.category}</span>
  </div>
  <div className="ticket-details-item">
    <span>Boarding Point:</span>
    <span>{ticket.boardingPoint}</span>
  </div>
  <div className="ticket-details-item">
    <span>Drop Point:</span>
    <span>{ticket.droppingPoint}</span>
  </div>
  <div className="ticket-details-item">
    <span>Departure Time:</span>
    <span>{ticket.departureTime}</span>
  </div>
  <div className="ticket-details-item">
    <span>Drop Time:</span>
    <span>{ticket.dropTime}</span>
  </div>
  <div className="ticket-details-item">
    <span>No. of Seats:</span>
    <span>{ticket.noOfSeats}</span>
  </div>
  <div className="ticket-details-item">
    <span>Status:</span>
    <span>{ticket.status}</span>
  </div>
  <div className="ticket-details-item">
    <span>Booked Person Name:</span>
    <span>{ticket.customerName}</span>
  </div>
  <div className="ticket-details-item">
    <span className="price">Price:</span>
    <span>{ticket.price} Rs</span>
  </div>
</div>
</div>
  );
};

export default TicketCard;
