//package com.ticketpedia.businfo.controller;
//
//import java.time.LocalDateTime;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//import com.ticketpedia.businfo.dto.ErrorResponse;
//import com.ticketpedia.businfo.exception.NoBusAvailableException;
//
//@RestControllerAdvice
//public class BusErrorController {
//
//	@ResponseStatus(code = HttpStatus.NO_CONTENT)
//	@ExceptionHandler(NoBusAvailableException.class)
//	public ResponseEntity<ErrorResponse> handleNoBusAvailableException(NoBusAvailableException e,
//			HttpServletRequest request) {
//		HttpStatus status = HttpStatus.NO_CONTENT;
//		ErrorResponse body = new ErrorResponse(LocalDateTime.now(), status.value(), status.getReasonPhrase(),
//				e.getMessage(), request.getRequestURI());
//
//		return ResponseEntity.status(status).body(body);
//	}
//}
