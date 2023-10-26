package com.ticketpedia.loginservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketpedia.loginservice.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
}
