package com.diefthyntis.MinimumViableProduct.dto.response;

import lombok.Data;

/*
 * Tous les champs sont des strings car ils vont être droppés dans une réponse qui va transiter sur 
 * la couche ethernet, qui ne gère que les string
 */
@Data
public class BlurbResponse {
	private String articleId;
    private String sentence;
    private String speakerId;
    private String topicId;
    private String articleTitle;
    private String creationDate;
    private String authorPseudonym;
    private String topicTitle;


    // Getters and setters
}
