package com.ticketpedia.usermanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticketpedia.usermanagement.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByUsername(String username);
    // Add any additional query methods for reading customers if needed
}
