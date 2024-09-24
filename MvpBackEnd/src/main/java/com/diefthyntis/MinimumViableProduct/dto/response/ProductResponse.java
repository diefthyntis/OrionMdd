package com.diefthyntis.MinimumViableProduct.dto.response;

import lombok.Data;

/*
 * Tous les champs sont des strings car ils vont être droppés dans une réponse qui va transiter sur 
 * la couche ethernet, qui ne gère que les string
 */
@Data
public class ProductResponse {
    private String subscriptionId;
    private String topicTitle;
    private String topicDescription;
    private String topicId;

    public ProductResponse(String subscriptionId, String topicTitle, String topicDescription,String topicId) {
        this.subscriptionId = subscriptionId;
        this.topicTitle = topicTitle;
        this.topicDescription = topicDescription;
        this.topicId=topicId;
    }

    // Getters and setters
}
