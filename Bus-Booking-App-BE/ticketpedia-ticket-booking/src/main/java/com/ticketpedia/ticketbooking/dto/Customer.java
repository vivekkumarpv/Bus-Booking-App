package com.ticketpedia.ticketbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
	private int customerId;
	private String customerName;
	private String email;
	private int age;
	private String gender;
	private String city;

}
