package com.ticketpedia.businfo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketpedia.businfo.dto.Rating;
import com.ticketpedia.businfo.model.Bus;
import com.ticketpedia.businfo.service.BusService;

@RestController
@RequestMapping("/admin/businfo")
@CrossOrigin("*")
public class BusController {

	@Autowired
	private BusService busService;

	@GetMapping("/getall")
	public List<Bus> viewAllBus() {
		return busService.viewAllBus();
	}

	@PostMapping("/add")
	public Bus addBus(@RequestBody Bus bus) {
		return busService.addBus(bus);
	}

	@PutMapping("/update")
	public Bus updateBus(@RequestBody Bus bus) {
		return busService.updateBus(bus);
	}

	@DeleteMapping("/delete/{busId}")
	public Bus deleteBus(@PathVariable int busId) {
		return busService.deleteBus(busId);
	}

	@GetMapping("/viewrating")
	public List<Rating> viewRating() {
		return busService.viewRating();
	}

	@GetMapping("/search/{date}/{origin}/{destination}")
	public List<Bus> searchBus(@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
			@PathVariable String origin, @PathVariable String destination) {
		return busService.getBusesForGivenDayOriginDestination(date, origin, destination);
	}

	@GetMapping("/search/{date}/{origin}/{destination}/{category}")
	public List<Bus> searchByCategory(@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
			@PathVariable String origin, @PathVariable String destination, @PathVariable String category) {

		return busService.getBusByCategory(date, origin, destination, category);

	}

	@GetMapping("/busnumber/{busNumber}")
	public Bus getBusByBusNumber(@PathVariable long busNumber) {
		Bus bus = busService.getBusByBusNumber(busNumber);
		return bus;

	}

	@GetMapping("/busid/{busId}")
	public Bus getBusByBusNumber(@PathVariable int busId) {
		Bus bus = busService.getBusById(busId);
		return bus;

	}

	@PostMapping("/fromSuggestion")
	public ResponseEntity<List<String>> getCitySuggestionsFrom(@RequestParam String city) {
		return ResponseEntity.ok(busService.autoSuggestionFrom(city));
	}
	
	@PostMapping("/toSuggestion")
	public ResponseEntity<List<String>> getCitySuggestionsTo(@RequestParam String city) {
		return ResponseEntity.ok(busService.autoSuggestionTo(city));
	}
}
