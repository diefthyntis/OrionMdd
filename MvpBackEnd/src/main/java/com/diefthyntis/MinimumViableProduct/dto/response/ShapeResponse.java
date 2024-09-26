package com.diefthyntis.MinimumViableProduct.dto.response;

import lombok.Data;

/*
 * Tous les champs sont des strings car ils vont être droppés dans une réponse qui va transiter sur 
 * la couche ethernet, qui ne gère que les string
 */
@Data
public class ShapeResponse {
    private String subscriptionId;
    private String topicTitle;
    private String topicDescription;
    private String topicId;



    // Getters and setters
}
