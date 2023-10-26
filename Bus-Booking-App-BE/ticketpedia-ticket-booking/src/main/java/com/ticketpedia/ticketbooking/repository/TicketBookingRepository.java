package com.ticketpedia.ticketbooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ticketpedia.ticketbooking.model.Ticket;

@Repository
public interface TicketBookingRepository extends JpaRepository<Ticket,Integer> {
	
//	@Query(value="from Ticket where customerId: customerId")
//	public List<Ticket> findTicketsByCustomerId(int customerId);
	
	 List<Ticket> findByCustomerId(int customerId);
}
