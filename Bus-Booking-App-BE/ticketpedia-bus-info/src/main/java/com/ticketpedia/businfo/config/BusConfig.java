package com.ticketpedia.businfo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class BusConfig {
	@Bean
//	@LoadBalanced
	public RestTemplate getRestTemplate() {
		RestTemplate restClient = new RestTemplate();
		return restClient;
	}
}
