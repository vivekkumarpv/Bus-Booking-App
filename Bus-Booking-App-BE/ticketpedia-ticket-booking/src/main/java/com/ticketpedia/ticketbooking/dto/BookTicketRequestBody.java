package com.ticketpedia.ticketbooking.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookTicketRequestBody {
	private Bus bus;
	private int noOfSeats;
	private LocalDate dateOfJourney;
	private String customerName;
	private int customerId;
}
