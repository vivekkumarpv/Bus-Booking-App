package com.ticketpedia.businfo.service;

import java.time.LocalDate;
import java.util.List;

import com.ticketpedia.businfo.dto.Rating;
import com.ticketpedia.businfo.model.Bus;

public interface BusService {
	public Bus addBus(Bus bus);

	public Bus updateBus(Bus bus);

	public Bus deleteBus(int BusId);

	public List<Bus> viewAllBus();

	public List<Rating> viewRating();

	public List<Bus> getBusesForGivenDayOriginDestination(LocalDate date, String origin, String destination);

	public List<Bus> getBusByCategory(LocalDate date, String origin, String destination, String category);

	public Bus getBusByBusNumber(long busNumber);

	public Bus getBusById(int busId);
	
	public List<String> autoSuggestionTo(String city);
	
	public List<String> autoSuggestionFrom(String city);

}
