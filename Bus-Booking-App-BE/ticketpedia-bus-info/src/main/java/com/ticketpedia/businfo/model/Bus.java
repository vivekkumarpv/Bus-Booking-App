package com.ticketpedia.businfo.model;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bus {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	@JsonIgnore
	@ElementCollection
	@Enumerated(EnumType.STRING)
	private List<DayOfWeek> runsOnWeekDays;
	private double ticketPrice;
		
}
