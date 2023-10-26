package com.ticketpedia.ticketbooking.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ticketpedia.ticketbooking.dto.Bus;
import com.ticketpedia.ticketbooking.dto.RouteDetail;
import com.ticketpedia.ticketbooking.dto.SearchRequestBody;
import com.ticketpedia.ticketbooking.dto.SearchResponseBody;
import com.ticketpedia.ticketbooking.model.Rating;
import com.ticketpedia.ticketbooking.model.Ticket;
import com.ticketpedia.ticketbooking.repository.RatingRepository;
import com.ticketpedia.ticketbooking.repository.TicketBookingRepository;

@Service
public class TicketBookingServiceImpl implements TicketBookingService {

	@Autowired
	RestTemplate busServiceClient;

	@Autowired
	TicketBookingRepository ticketBookingRepository;

	@Autowired
	RatingRepository ratingRepository;

	@Override
	public Ticket bookBusTicket(Bus bus, int numOfSeats, LocalDate dateOfJourney, String customerName, int customerId) {
		Ticket newTicket = new Ticket();
		newTicket.setCustomerName(customerName);
		newTicket.setCustomerId(customerId);
		newTicket.setBusName(bus.getBusName());
		newTicket.setPnrNumber(pnrNumberGernerator());
		newTicket.setNoOfSeats(numOfSeats);
		newTicket.setCategory(bus.getCategory());
		newTicket.setStatus("Confirmed"); 
		double totalPrice = numOfSeats * bus.getTicketPrice();
		newTicket.setPrice(totalPrice);
		newTicket.setDroppingPoint(bus.getDestination());
		newTicket.setBoardingPoint(bus.getOrigin());
		newTicket.setDepartureTime(bus.getDepartureTime());
		newTicket.setDropTime(bus.getDropTime());
		newTicket.setDateOfJourney(dateOfJourney);
		newTicket.setDateOfBooking(LocalDate.now());
		newTicket.setTimeOfBooking(LocalTime.now());
		ticketBookingRepository.save(newTicket);
		bus.setNoOfSeats(bus.getNoOfSeats()-numOfSeats);
		busServiceClient.put("http://localhost:8080/admin/businfo/update",bus);
		return newTicket;
		
	}

	@Override
	public List<Ticket> viewBookedBusTicket() {
		List<Ticket> bookedTickets = ticketBookingRepository.findAll();
		return bookedTickets;
	}

	@Override
	public Ticket cancelBusTicket(int ticketId) {
		Ticket cancelledTicket = ticketBookingRepository.findById(ticketId).get();
		ticketBookingRepository.deleteById(ticketId);
		return cancelledTicket;
	}

	@Override
	public Rating addRating(int busId, int customerId, int rating, String remarks) {
		Rating newRating = new Rating();
		newRating.setBusId(busId);
		newRating.setBusName(fetchBusName(busId));
		newRating.setCustomerId(customerId);
		newRating.setRating(rating);
		newRating.setRemarks(remarks);
		ratingRepository.save(newRating);
		return newRating;
	}

	private String fetchBusName(int busId) {
		Bus bus = busServiceClient.getForObject("http://localhost:8080/admin/businfo/busid/" + busId, Bus.class);
		String busName = bus.getBusName();
		return busName;
	}

	@Override
	public List<Bus> searchBus(LocalDate date, String origin, String destination) {
		List<Bus> busSearchList = busServiceClient.getForObject(
				"http://localhost:8080/admin/businfo/search/" + date + "/" + origin + "/" + destination, List.class);
		return busSearchList;
	}

	public List<Bus> getBusByCategory(LocalDate date, String origin, String destination, String category) {
		List<Bus> busSearchByCategoryList = busServiceClient.getForObject("http://localhost:8080/admin/businfo/search/"
				+ date + "/" + origin + "/" + destination + "/" + category, List.class);
		return busSearchByCategoryList;

	}

	@Override
	public List<SearchResponseBody> searchBusForOneWayRound(SearchRequestBody searchRequestBody) {
		List<SearchResponseBody> resultList = new ArrayList<>();
		for (RouteDetail route : searchRequestBody.routeDetailList) {
			List<Bus> fetchedBuses = getBusByCategory(route.getDate(), route.getOrigin(), route.getDestination(),
					searchRequestBody.getCategory());
			SearchResponseBody result = new SearchResponseBody(route.getDate(), route.getOrigin(),
					route.getDestination(), fetchedBuses);
			resultList.add(result);
		}
		return resultList;
	}

	public Bus fetchBusByBusNumber(long busNumber) {
		Bus fetchedBus = busServiceClient.getForObject("http://localhost:8080/admin/businfo/busnumber/" + busNumber,
				Bus.class);
		return fetchedBus;

	}

	public long pnrNumberGernerator() {
		long timestamp = System.currentTimeMillis();

		// Generate a random 3-digit number
		Random random = new Random();
		int randomNumber = random.nextInt(900) + 100; // Generates random number between 100 and 999

		// Combine the timestamp and random number to get a 10-digit PNR number
		long pnrNumber = timestamp / 1010 + randomNumber;

		return pnrNumber;

	}

	public Ticket getTicketById(int ticketId) {
		return ticketBookingRepository.findById(ticketId).get();
	}

	@Override
	public List<Rating> getAllRating() {
		return ratingRepository.findAll();
	}

	@Override
	public List<Rating> getRatingsGivenByACustomer(int customerId) {
		List<Rating> ratingList = ratingRepository.findRatingsGivenByACustomer(customerId);
		return ratingList;
	}

	@Override
	public List<Ticket> findTicketsByCustomerId(int customerId) {
		List<Ticket> fetchedTickets=ticketBookingRepository.findByCustomerId(customerId);
		return fetchedTickets;
	}

}
