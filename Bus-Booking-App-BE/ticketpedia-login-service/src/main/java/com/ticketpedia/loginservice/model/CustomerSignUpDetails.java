package com.ticketpedia.loginservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSignUpDetails {
    private int customerId;
    private String customerName;
    private int age;
    private String email;
    private String gender;
    private String city;
    private String username;
    private String password;
    private String role;

    // getters and setters
}
