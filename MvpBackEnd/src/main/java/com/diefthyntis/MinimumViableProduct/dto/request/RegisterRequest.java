package com.diefthyntis.MinimumViableProduct.dto.request;

import com.diefthyntis.MinimumViableProduct.security.ValidPassword;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

/*
 * Un mot de passe est valide si :
- son nombre de caractère est supérieur ou égal à 8 caractères ;
- il contient au moins un de chacun de ces types de caractères :
- chiffre,
- lettre minuscule,
- lettre majuscule,
- caractère spécial.

 */

@Data
public class RegisterRequest {
	
	@NotEmpty(message = "L'adresse email ne doit pas être vide")
    @Email(message = "Veuillez fournir une adresse email valide")
    private String emailaddress;
	
	@NotEmpty(message = "Le mot de passe ne doit pas être vide")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
	private String password;
	
	@NotEmpty(message = "Le pseudonyme ne doit pas être vide")
    @Size(min = 3, max = 20, message = "Le pseudonyme doit contenir entre 3 et 20 caractères")
    private String pseudonym;
}
