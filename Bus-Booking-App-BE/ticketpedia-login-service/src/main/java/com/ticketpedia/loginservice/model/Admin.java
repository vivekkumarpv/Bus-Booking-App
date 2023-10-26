package com.ticketpedia.loginservice.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Admin extends User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int adminId;
	private String username;
	private String email;
	private String role;

}
