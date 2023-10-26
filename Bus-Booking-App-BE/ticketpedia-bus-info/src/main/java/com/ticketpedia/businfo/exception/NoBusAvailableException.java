package com.ticketpedia.businfo.exception;

public class NoBusAvailableException extends RuntimeException {
	public NoBusAvailableException(String message) {
		super(message);
	}

}
