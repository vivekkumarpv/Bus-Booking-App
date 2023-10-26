package com.ticketpedia.loginservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ticketpedia.loginservice.Repository.AdminRepository;
import com.ticketpedia.loginservice.model.Admin;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Admin createAdmin(Admin admin) {
        // Check if the username is already taken
        if (adminRepository.findByUsername(admin.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }

        // Encrypt the password before saving
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin authenticateAdmin(String username, String password) {
        // Find the admin by username
        Admin admin = adminRepository.findByUsername(username);

        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            // Passwords match, return the authenticated admin
            return admin;
        }

        // Invalid credentials
        throw new RuntimeException("Invalid username or password");
    }
}
