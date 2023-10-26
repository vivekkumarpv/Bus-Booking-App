package com.ticketpedia.loginservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketpedia.loginservice.jwt.JwtTokenProvider;
import com.ticketpedia.loginservice.model.Admin;
import com.ticketpedia.loginservice.service.AdminService;

@RestController
@RequestMapping("/api/admins")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public String login(@RequestBody Admin admin) {
        // Call the authenticateAdmin method from the adminService
        Admin authenticatedAdmin = adminService.authenticateAdmin(admin.getUsername(),
                admin.getPassword());

        // Generate a JWT token here and return it as a response
        String token = jwtTokenProvider.createToken(authenticatedAdmin.getUsername(),
                authenticatedAdmin.getRole());

        // Return the token
        return token;
    }
}
