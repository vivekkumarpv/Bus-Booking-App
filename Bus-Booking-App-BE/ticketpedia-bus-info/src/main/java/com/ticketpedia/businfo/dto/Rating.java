package com.ticketpedia.businfo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
	
	private int busId;
	private int customerId;
	private int rating;
	private String remarks;
}
