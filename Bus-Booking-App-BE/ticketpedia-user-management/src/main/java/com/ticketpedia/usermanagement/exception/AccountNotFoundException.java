package com.ticketpedia.usermanagement.exception;

public class AccountNotFoundException extends RuntimeException {
	public AccountNotFoundException(String message) {
		super(message);
	}
}
