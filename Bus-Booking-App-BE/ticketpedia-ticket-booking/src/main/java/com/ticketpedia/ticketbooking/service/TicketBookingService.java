package com.ticketpedia.ticketbooking.service;

import java.time.LocalDate;
import java.util.List;

import com.ticketpedia.ticketbooking.dto.Bus;
import com.ticketpedia.ticketbooking.dto.SearchRequestBody;
import com.ticketpedia.ticketbooking.dto.SearchResponseBody;
import com.ticketpedia.ticketbooking.model.Rating;
import com.ticketpedia.ticketbooking.model.Ticket;

public interface TicketBookingService {
	public Ticket bookBusTicket(Bus bus, int numOfSeats, LocalDate dateOfJourney, String customerName, int customerId);

	public List<Ticket> viewBookedBusTicket();

	public Ticket cancelBusTicket(int ticketId);

	public Rating addRating(int busId,int customerId,int rating,String remarks);

	public List<Bus> searchBus(LocalDate date, String origin, String destination);

	public List<SearchResponseBody> searchBusForOneWayRound(SearchRequestBody searchRequestBody);
	
	public Ticket getTicketById(int ticketId);
	
	public List<Rating> getAllRating();
	
	public List<Rating> getRatingsGivenByACustomer(int customerId);
	
	public List<Ticket> findTicketsByCustomerId(int customerId);
}
