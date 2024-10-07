package com.diefthyntis.MinimumViableProduct.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Reason: The value doesn't look like an email address.")
public class EmailaddressNotValidException extends RuntimeException {
	 private static final long serialVersionUID = 1L;
	    public EmailaddressNotValidException(String sentence) {
	        super(sentence);
	    }
}

