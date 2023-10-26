package com.ticketpedia.businfo.exception;

public class BusNotFoundException extends RuntimeException {
	public BusNotFoundException(String message) {
		super(message);
	}
}
