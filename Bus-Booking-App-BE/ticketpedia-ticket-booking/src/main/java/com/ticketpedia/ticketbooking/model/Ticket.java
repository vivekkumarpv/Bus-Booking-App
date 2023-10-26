package com.ticketpedia.ticketbooking.model;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int ticketId;
	private int customerId;
	private String customerName;
	private String busName;
	private long pnrNumber;
	private int noOfSeats;
	private String category;
	private String status;
	private double price;
	private String droppingPoint;
	private String boardingPoint;
	private LocalTime departureTime;
	private LocalTime dropTime;
	private LocalDate dateOfJourney;
	private LocalDate dateOfBooking;
	private LocalTime timeOfBooking;
}
