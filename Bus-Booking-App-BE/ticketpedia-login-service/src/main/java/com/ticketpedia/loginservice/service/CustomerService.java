package com.ticketpedia.loginservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ticketpedia.loginservice.Repository.CustomerRepository;
import com.ticketpedia.loginservice.model.Customer;

@Service
public class CustomerService implements UserDetailsService {

    private CustomerRepository customerRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Customer customer = customerRepository.findByUsername(username);
		if (customer == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}

		return org.springframework.security.core.userdetails.User.withUsername(username)
				.password(customer.getPassword()).roles("USER") // Assign roles as needed
				.build();
	}

	// Other methods of your CustomerService

	public Customer createCustomer(Customer customer) {
		// Check if the username is already taken
		if (customerRepository.findByUsername(customer.getUsername()) != null) {
			throw new RuntimeException("Username already exists");
		}

		// Encrypt the password before saving
		customer.setPassword(passwordEncoder.encode(customer.getPassword()));
		return customerRepository.save(customer);
	}

	public Customer authenticateCustomer(String username, String password) {
		// Find the customer by username
		Customer customer = customerRepository.findByUsername(username);

		if (customer != null && passwordEncoder.matches(password, customer.getPassword())) {
			// Passwords match, return the authenticated customer
			return customer;
		}

		// Invalid credentials
		throw new RuntimeException("Invalid username or password");
	}

}
