package com.ticketpedia.ticketbooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ticketpedia.ticketbooking.model.Rating;

public interface RatingRepository extends JpaRepository<Rating,Integer>{

	@Query(value = "from Rating where customerId=:customerId")
	public List<Rating> findRatingsGivenByACustomer(int customerId) ;
}
