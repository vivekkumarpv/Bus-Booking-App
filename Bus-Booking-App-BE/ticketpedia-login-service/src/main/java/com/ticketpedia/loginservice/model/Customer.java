package com.ticketpedia.loginservice.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Customer extends User {
	@Id
    private int customerId;
    private String username;
    private int age;
    private String email;
    private String gender;
    private String city;
    private String role;
    private String token; // Add the token property

    // getters and setters
}

