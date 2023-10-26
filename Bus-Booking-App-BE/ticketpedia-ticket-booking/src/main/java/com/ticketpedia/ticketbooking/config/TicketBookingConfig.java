package com.ticketpedia.ticketbooking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class TicketBookingConfig {
	@Bean
//	@LoadBalanced
	public RestTemplate getRestTemplate() {
		RestTemplate restClient = new RestTemplate();
		return restClient;
	}
}
