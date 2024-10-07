package com.diefthyntis.MinimumViableProduct.controller;


import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diefthyntis.MinimumViableProduct.dto.request.RegisterRequest;
import com.diefthyntis.MinimumViableProduct.dto.request.SignInRequest;
import com.diefthyntis.MinimumViableProduct.exception.BadCredentialException;
import com.diefthyntis.MinimumViableProduct.exception.EmailaddressAlreadyExistsException;
import com.diefthyntis.MinimumViableProduct.exception.EmailaddressNotFilledException;
import com.diefthyntis.MinimumViableProduct.exception.EmailaddressNotValidException;
import com.diefthyntis.MinimumViableProduct.exception.PasswordNotValidException;
import com.diefthyntis.MinimumViableProduct.exception.PseudonymAlreadyExistsException;
import com.diefthyntis.MinimumViableProduct.mapping.SpeakerMapping;
import com.diefthyntis.MinimumViableProduct.model.Speaker;
import com.diefthyntis.MinimumViableProduct.security.JsonWebToken;
import com.diefthyntis.MinimumViableProduct.service.SpeakerService;
import com.diefthyntis.MinimumViableProduct.util.CredentialUtils;
import com.diefthyntis.MinimumViableProduct.util.JwtUtils;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.validation.BindingResult;


// AuthController communique directement avec le FrontEnd, que ce soit Angular ou Postman


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthentificationController {
	private final SpeakerService speakerService;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final SpeakerMapping speakerMapping;
	
	@PostMapping("/register")
    public ResponseEntity<?> registerUser(final @Valid @RequestBody RegisterRequest registerRequest,BindingResult bindingResult) {
		
		   if (bindingResult.hasErrors()) {
		        String errorMessage = bindingResult.getFieldError().getDefaultMessage();
		        return ResponseEntity.badRequest().body(errorMessage);
		    }

		   if (!CredentialUtils.isEmailaddressFilled(registerRequest.getEmailaddress())) {
				throw new EmailaddressNotFilledException("The email address is not provided when it should be.");
	         
	        }	 
		   
		   
		   if (!CredentialUtils.isEmailaddressValid(registerRequest.getEmailaddress())) {
				throw new EmailaddressNotValidException("The value doesn't look like an email address");
	         
	        }	 
		   
		   
	
		
		// ? signifie la généricité, donc je peux passer n'importe quel type d'objet dans la méthode responseEntity.ok
		if (speakerService.existsByEmailaddress(registerRequest.getEmailaddress())) {
			throw new EmailaddressAlreadyExistsException("Email address already exists");
         
        }
		
		if (speakerService.existsByPseudonym(registerRequest.getPseudonym())) {
			throw new PseudonymAlreadyExistsException("Pseudonym already exists");
         
        }
		
	    // Validation du mot de passe
	    if (!CredentialUtils.isPasswordValid(registerRequest.getPassword())) {
	        throw new PasswordNotValidException("Password does not meet the security criteria.");
	    }
		

		
		final Speaker speaker=speakerMapping.mapRegisterRequestToSpeaker(registerRequest);
		speaker.setPassword(passwordEncoder.encode(speaker.getPassword()));
		speakerService.save(speaker);
		
		final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(registerRequest.getEmailaddress(), registerRequest.getPassword()));
        final String jwt = jwtUtils.generateJsonWebToken(authentication);
		
		
		JsonWebToken JsonWebToken= new JsonWebToken(jwt);
		return ResponseEntity.ok(JsonWebToken);
		
		
		/* dans cette application, il y a un parti pris de créer le compte utilisateur
		 * et de redigirer tout de suite sur la page du gestion du profil utilisateur
		 * mais cela pourrait etre fait en 2 temps où le user serait obligé de se connecter après validation
		 * de la création de son compte
		 */
		
	}
	
	
	@PostMapping("/login")
    public ResponseEntity<?> connexionUser(final @RequestBody SignInRequest signinRequest) {
		
		// ? signifie la généricité, donc je peux passer n'importe quel type d'objet dans la méthode responseEntity.ok
		if (!speakerService.existsByEmailaddress(signinRequest.getLogin()) &&
				!speakerService.existsByPseudonym(signinRequest.getLogin())	) {
			throw new BadCredentialException("Bad credential");
        }
		
		final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signinRequest.getLogin(), signinRequest.getPassword()));
        final String jwt = jwtUtils.generateJsonWebToken(authentication);
		
		
		JsonWebToken JsonWebToken= new JsonWebToken(jwt);
		return ResponseEntity.ok(JsonWebToken);
		
	
		
	}


	@GetMapping("/me")
    public ResponseEntity<Speaker> getMe(final Principal principal) {
		String login = principal.getName();
		final Speaker speaker=speakerService.findBylogin(login);
		return ResponseEntity.ok(speaker);
    }
	
	
	
}

