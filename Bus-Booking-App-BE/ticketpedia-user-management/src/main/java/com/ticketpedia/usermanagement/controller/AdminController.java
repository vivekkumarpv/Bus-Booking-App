package com.ticketpedia.usermanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketpedia.usermanagement.model.Admin;
import com.ticketpedia.usermanagement.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {
	@Autowired
	private AdminService adminService;

	@PostMapping("/signup")
	public Admin signup(@RequestBody Admin admin) {
		return adminService.signup(admin);
	}

}
