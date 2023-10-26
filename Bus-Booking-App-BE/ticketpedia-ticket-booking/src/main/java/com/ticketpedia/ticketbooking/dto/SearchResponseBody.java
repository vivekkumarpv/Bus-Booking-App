package com.ticketpedia.ticketbooking.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponseBody {
	private LocalDate date;
	private String origin;
	private String destination;
	private List<Bus> searchResults;
}
