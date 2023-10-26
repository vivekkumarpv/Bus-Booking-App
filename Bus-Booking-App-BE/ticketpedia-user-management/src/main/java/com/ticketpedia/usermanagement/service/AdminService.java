package com.ticketpedia.usermanagement.service;

import com.ticketpedia.usermanagement.model.Admin;
import com.ticketpedia.usermanagement.model.Customer;

public interface AdminService {
    Admin login(String username, String password);
    Admin findByUsername(String username); // Add this method
    Admin signup(Admin admin);
}
