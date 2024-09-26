package com.diefthyntis.MinimumViableProduct.mapping;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.diefthyntis.MinimumViableProduct.dto.request.RegisterRequest;
import com.diefthyntis.MinimumViableProduct.dto.request.SpeakerRequest;
import com.diefthyntis.MinimumViableProduct.dto.response.SpeakerResponse;
import com.diefthyntis.MinimumViableProduct.model.Speaker;
import com.diefthyntis.MinimumViableProduct.util.DateUtils;
import com.diefthyntis.MinimumViableProduct.util.NumberUtils;




@Component
public class SpeakerMapping {
	public SpeakerResponse mapSpeakerToSpeakerResponse(Speaker speaker) {
		final SpeakerResponse speakerResponse = new SpeakerResponse();
		speakerResponse.setId(speaker.getId());
		speakerResponse.setLogin(speaker.getLogin());
		speakerResponse.setCreationdate(DateUtils.convertLocalDateToString(speaker.getCreationdate()));
		speakerResponse.setModificationdate(DateUtils.convertLocalDateToString(speaker.getModificationdate()));
		return speakerResponse;
	}
	
	public Speaker mapRegisterRequestToSpeaker(RegisterRequest registerRequest) {
		final Speaker speaker = new Speaker();
		speaker.setEmailaddress(registerRequest.getEmailaddress());
		speaker.setPassword(registerRequest.getPassword());
		speaker.setPseudonym(registerRequest.getPseudonym());
		return speaker;
		
	}
	
	public Speaker mapSpeakerRequestToSpeaker(SpeakerRequest speakerRequest) {
		final Speaker speaker = new Speaker();
		speaker.setId(NumberUtils.convertToInteger(speakerRequest.getSpeakerId()));
		speaker.setEmailaddress(speakerRequest.getEmailAddress());
		speaker.setPassword(speakerRequest.getPassword());
		speaker.setPseudonym(speakerRequest.getPseudonym());
		speaker.setModificationdate(LocalDateTime.now());
		return speaker;
		
	}
}
