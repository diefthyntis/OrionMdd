package com.diefthyntis.MinimumViableProduct.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Reason: Password does not meet the security criteria.")
public class PasswordNotValidException extends RuntimeException {
	 private static final long serialVersionUID = 1L;
	    public PasswordNotValidException(String sentence) {
	        super(sentence);
	    }
}

