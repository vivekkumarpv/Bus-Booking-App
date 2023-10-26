package com.ticketpedia.ticketbooking.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteDetail {
	public String origin;
	public String destination;
	public LocalDate date;
}
