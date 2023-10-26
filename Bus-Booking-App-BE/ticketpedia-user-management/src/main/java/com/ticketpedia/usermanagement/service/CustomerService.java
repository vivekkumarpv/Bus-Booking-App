package com.ticketpedia.usermanagement.service;

import com.ticketpedia.usermanagement.model.Customer;

public interface CustomerService {
    Customer signup(Customer customer);
    Customer login(String username, String password);
    Customer findByUsername(String username); // Add this method
}
