package com.diefthyntis.MinimumViableProduct.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


/*
 * GlobalExceptionHandler est en veille des exceptions qu'il faut gérer de façon particulière
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(LoginAlreadyExistsException.class)
    public ResponseEntity<String> handleloginAlreadyExistsException(LoginAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
	
	@ExceptionHandler({SpeakerNotFoundException.class})
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
	
    // Gestion de l'exception EmailaddressAlreadyExistsException
    @ExceptionHandler(EmailaddressAlreadyExistsException.class)
    public ResponseEntity<String> handleEmailExistsException(EmailaddressAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    // Gestion de l'exception PseudonymAlreadyExistsException
    @ExceptionHandler(PseudonymAlreadyExistsException.class)
    public ResponseEntity<String> handlePseudonymExistsException(PseudonymAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        FieldError fieldError = ex.getBindingResult().getFieldError();
        String errorMessage = (fieldError != null) ? fieldError.getDefaultMessage() : "Validation error";
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
    
    // Gestion de l'exception EmailaddressNotFilledException
    @ExceptionHandler(EmailaddressNotFilledException.class)
    public ResponseEntity<String> handleEmailaddressNotFilledException(EmailaddressNotFilledException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
	
    // Gestion de l'exception EmailaddressNotValidException
    @ExceptionHandler(EmailaddressNotValidException.class)
    public ResponseEntity<String> handleEmailaddressNotValidException(EmailaddressNotValidException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    
    // Gestion de l'exception PasswordNotValidException
    @ExceptionHandler(PasswordNotValidException.class)
    public ResponseEntity<String> handlePasswordNotValidException(PasswordNotValidException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
	
 
    // Gestion de l'exception BadCredentialException
    @ExceptionHandler(BadCredentialException.class)
    public ResponseEntity<String> handleBadCredentialException(BadCredentialException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
	
}


