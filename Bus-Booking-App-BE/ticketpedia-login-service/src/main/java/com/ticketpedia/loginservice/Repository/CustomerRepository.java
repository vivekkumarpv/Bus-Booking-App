package com.ticketpedia.loginservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketpedia.loginservice.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	Customer findByUsername(String username);
}
