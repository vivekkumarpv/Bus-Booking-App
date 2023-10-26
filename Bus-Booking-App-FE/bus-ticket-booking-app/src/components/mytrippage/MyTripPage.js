

import React, { useState, useEffect } from 'react';
import TicketCard from '../cards/TicketCard';
import './MyTripPage.css';

const MyTripPage = () => {
  const [tickets, setTickets] = useState([]);

  // Retrieve customerData from session storage
  const customerData = JSON.parse(sessionStorage.getItem('customerData'));
  
  // Extract customerId from customerData
  const customerId = customerData ? customerData.customerId : null;

  // Use the useEffect hook to retrieve the ticket from sessionStorage when the component mounts
  useEffect(() => {
    const storedTicket = localStorage.getItem('myTicket');
    if (storedTicket) {
      setTickets([JSON.parse(storedTicket)]);
    }
  }, []);

  useEffect(() => {
    if (customerId) {
      // Use customerId to fetch tickets from the API
      fetch(`http://localhost:8001/customer/getTickets?customerId=${customerId}`)
        .then((response) => response.json())
        .then((data) => {
          setTickets(data);
        })
        .catch((error) => {
          console.error('Error fetching tickets:', error);
        });
    } else {
      // Handle the case when customerId is not available
      console.error('customerId is not available');
    }
  }, [customerId]);

  return (
    <div className="my-trip-container">
      <h4 className="heading">Upcoming Journeys</h4>
      {tickets.length > 0 ? (
        <div className="ticket-list">
          {tickets.map((ticket, index) => (
            <TicketCard key={index} ticket={ticket} />
          ))}
        </div>
      ) : (
        <h4 className="message">No tickets to show</h4>
      )}
    </div>
  );
};

export default MyTripPage;
