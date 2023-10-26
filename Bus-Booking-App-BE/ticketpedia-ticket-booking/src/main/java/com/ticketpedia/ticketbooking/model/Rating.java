package com.ticketpedia.ticketbooking.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Rating {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int ratingId;
	private int busId;
	private String busName;
	private int customerId;
	private int rating;
	private String remarks;
	
}
