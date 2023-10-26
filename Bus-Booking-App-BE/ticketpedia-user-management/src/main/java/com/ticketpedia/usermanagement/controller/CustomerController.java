package com.ticketpedia.usermanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketpedia.usermanagement.dto.LoginCredentials;
import com.ticketpedia.usermanagement.model.Admin;
import com.ticketpedia.usermanagement.model.Customer;
import com.ticketpedia.usermanagement.service.AdminService;
import com.ticketpedia.usermanagement.service.CustomerService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class CustomerController {
	@Autowired
	private CustomerService customerService;

	@Autowired
	private AdminService adminService;

	@PostMapping("/signup")
	public Customer signup(@RequestBody Customer customer) {
		return customerService.signup(customer);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginCredentials user) {
		Customer customer = customerService.login(user.getUsername(), user.getPassword());
		Admin admin = adminService.login(user.getUsername(), user.getPassword());
		if (customer != null) {
			return ResponseEntity.ok(customer);
		} else if (user != null) {
			return ResponseEntity.ok(admin);
		}
		return ResponseEntity.noContent().build();
	}

}
