package com.diefthyntis.MinimumViableProduct.util;

import java.util.regex.Pattern;

public class CredentialUtils {

	public static boolean isEmailaddressValid(String emailaddress) {
	    String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
	    Pattern pattern = Pattern.compile(emailRegex);
	    
	    if (emailaddress == null) {
	        return false;
	    }
	    return pattern.matcher(emailaddress).matches();
	}
	
    public static boolean isEmailaddressFilled(String emailaddress) {
    	return emailaddress != null && !emailaddress.trim().isEmpty();
    }

	public static boolean isPasswordValid(String password) {
		//String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\\\|,.<>/?]).{8,}$";
		// ancienne valeur qui marche tout le temps
		
		String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>]).*$";
	
		
		Pattern pattern = Pattern.compile(passwordRegex);
		if (password == null) {
	        return false;
	    }
	    return pattern.matcher(password).matches();
	}


}
