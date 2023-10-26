package com.ticketpedia.ticketbooking.dto;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bus {

	
	private int busId;
	private long busNumber;
	private String busName;
	private int noOfSeats;
	private String category;
	@DateTimeFormat(iso = ISO.TIME)
	private LocalTime dropTime;
	@DateTimeFormat(iso = ISO.TIME)
	private LocalTime departureTime;
	private String origin;
	private String destination;
	private List<DayOfWeek> runsOnWeekDays;
	private double ticketPrice;
}


