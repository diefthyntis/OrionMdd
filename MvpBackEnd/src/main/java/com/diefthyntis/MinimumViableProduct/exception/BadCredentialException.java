package com.diefthyntis.MinimumViableProduct.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Bad credential")
public class BadCredentialException extends RuntimeException {
	 private static final long serialVersionUID = 1L;
	    public BadCredentialException(String sentence) {
	        super(sentence);
	    }
}

