package com.diefthyntis.MinimumViableProduct.dto.request;

import lombok.Data;

@Data
public class SpeakerRequest {
	private String speakerId;
	private String emailAddress;
	private String password;
	private String pseudonym;
	private String modificationDate;
}
