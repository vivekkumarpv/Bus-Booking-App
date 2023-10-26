package com.ticketpedia.businfo.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequestBody {
	public String origin;
	public String destination;
	public LocalDate date;
	public String category;
}
