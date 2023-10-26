package com.ticketpedia.businfo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ticketpedia.businfo.dto.Rating;
import com.ticketpedia.businfo.exception.BusAlreadyExistException;
import com.ticketpedia.businfo.exception.BusNotFoundException;
import com.ticketpedia.businfo.exception.NoBusAvailableException;
import com.ticketpedia.businfo.model.Bus;
import com.ticketpedia.businfo.repository.BusRepository;

@Service
public class BusServiceImpl implements BusService {

	@Autowired
	private BusRepository busRepo;

	@Autowired
	private RestTemplate ticketServiceClient;

	@Override
	public Bus addBus(Bus bus) {
		int id = bus.getBusId();
		Optional<Bus> optBus = busRepo.findById(id);
		if (optBus.isPresent()) {
			throw new BusAlreadyExistException("Bus Already Exists");
		}
		Bus addedBus = busRepo.save(bus);
		return addedBus;
	}

	@Override
	public Bus updateBus(Bus bus) {
		int id = bus.getBusId();
		Optional<Bus> optBus = busRepo.findById(id);
		if (optBus.isEmpty()) {
			throw new BusNotFoundException("Bus Not Found");
		}
		Bus updBus = busRepo.save(bus);
		return updBus;
	}

	@Override
	public Bus deleteBus(int busId) {
		Optional<Bus> optBus = busRepo.findById(busId);
		if (optBus.isEmpty()) {
			throw new BusNotFoundException("Bus Not Found");
		}
		busRepo.deleteById(busId);
		return optBus.get();
	}

	@Override
	public List<Bus> viewAllBus() {

		return busRepo.findAll();
	}

	@Override
	public List<Rating> viewRating() {
		List<Rating> busRatings = fetchAllBusRating();
		return busRatings;
	}

	@Override
	public List<Bus> getBusesForGivenDayOriginDestination(LocalDate date, String origin, String destination) {
		List<Bus> busList = busRepo.findBusesForGivenDayOriginDestination(date.getDayOfWeek(), origin, destination);
		if (busList.isEmpty()) {
			throw new NoBusAvailableException(
					"No buses are available on " + date + " from " + origin + " to " + destination);
		}
		return busList;
	}

	@Override
	public List<Bus> getBusByCategory(LocalDate date, String origin, String destination, String category) {
		List<Bus> customerSelectedBusByCategoty = busRepo.findBusByCategory(date.getDayOfWeek(), origin, destination,
				category);
		
		return customerSelectedBusByCategoty;
	}

	public List<Rating> fetchAllBusRating() {
		List<Rating> fetchedRating = ticketServiceClient.getForObject("http://localhost:8001/customer/viewrating",
				List.class);
		return fetchedRating;
	}

	@Override
	public Bus getBusByBusNumber(long busNumber) {
		Bus bus = busRepo.findByBusNumber(busNumber).get();
		return bus;
	}

	@Override
	public Bus getBusById(int busId) {
		Bus bus = busRepo.findById(busId).get();
		return bus;
	}

	@Override
	public List<String> autoSuggestionTo(String city) {
		return busRepo.autoSearchCityNameTo(city);
	}
	
	@Override
	public List<String> autoSuggestionFrom(String city) {
		return busRepo.autoSearchCityNameFrom(city);
	}

}
