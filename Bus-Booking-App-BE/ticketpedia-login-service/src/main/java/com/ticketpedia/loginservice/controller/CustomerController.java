package com.ticketpedia.loginservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketpedia.loginservice.jwt.JwtTokenProvider;
import com.ticketpedia.loginservice.model.Customer;
import com.ticketpedia.loginservice.service.CustomerService;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
	@Autowired
	private CustomerService customerService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@PostMapping("/signup")
	public Customer signUp(@RequestBody Customer customer) {
		// Call the createCustomer method from the customerService
		Customer createdCustomer = customerService.createCustomer(customer);

		// You can generate a JWT token here and return it as a response
		String token = jwtTokenProvider.createToken(createdCustomer.getUsername(), createdCustomer.getRole());

		// Add the token to the customer response
		createdCustomer.setToken(token);

		// Return the created customer with the token
		return createdCustomer;
	}

	@PostMapping("/login")
	public String login(@RequestBody Customer customer) {
		// Call the authenticateCustomer method from the customerService
		Customer authenticatedCustomer = customerService.authenticateCustomer(customer.getUsername(),
				customer.getPassword());

		// You can generate a JWT token here and return it as a response
		String token = jwtTokenProvider.createToken(authenticatedCustomer.getUsername(),
				authenticatedCustomer.getRole());

		// Return the token
		return token;
	}
}
