package com.diefthyntis.MinimumViableProduct.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.diefthyntis.MinimumViableProduct.dto.request.SpeakerRequest;
import com.diefthyntis.MinimumViableProduct.dto.response.ServerResponse;
import com.diefthyntis.MinimumViableProduct.mapping.SpeakerMapping;
import com.diefthyntis.MinimumViableProduct.model.Speaker;
import com.diefthyntis.MinimumViableProduct.service.SpeakerService;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class SpeakerController {
	
	private final SpeakerService speakerService;
	private final SpeakerMapping speakerMapping;
	private final PasswordEncoder passwordEncoder;
	
	@PutMapping("/updateSpeaker")
	public ResponseEntity<ServerResponse> update(
			final @RequestPart("speakerId") String speakerId,
			final @RequestPart("pseudonym") String pseudonym,
			final @RequestPart("emailAddress") String emailaddress, 
			final @RequestPart("password") String password) throws IOException, java.io.IOException {
		log.info("RentalController - Début de la modification de rental");

		final SpeakerRequest speakerRequest = new SpeakerRequest();
		speakerRequest.setEmailAddress(emailaddress);
		speakerRequest.setPseudonym(pseudonym);
		speakerRequest.setPassword(password);
		speakerRequest.setSpeakerId(speakerId);
		final Speaker speaker = this.speakerMapping.mapSpeakerRequestToSpeaker(speakerRequest);
		speaker.setPassword(passwordEncoder.encode(speaker.getPassword()));
		
		speakerService.save(speaker);

		return ResponseEntity.ok(new ServerResponse("Credentials updated !"));

	}

}
