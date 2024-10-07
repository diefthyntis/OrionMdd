package com.diefthyntis.MinimumViableProduct.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "The email address is not provided when it should be.")
public class EmailaddressNotFilledException extends RuntimeException {
	 private static final long serialVersionUID = 1L;
	    public EmailaddressNotFilledException(String sentence) {
	        super(sentence);
	    }
}



