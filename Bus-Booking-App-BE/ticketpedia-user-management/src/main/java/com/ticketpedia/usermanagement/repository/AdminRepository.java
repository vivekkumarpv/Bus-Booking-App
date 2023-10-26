package com.ticketpedia.usermanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticketpedia.usermanagement.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByUsername(String username);
    // Add any additional query methods for reading admins if needed
}
