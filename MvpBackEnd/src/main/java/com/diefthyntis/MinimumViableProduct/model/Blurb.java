package com.diefthyntis.MinimumViableProduct.model;

public interface Blurb {
	Integer getArticleId();
	String getSentence();
	Integer getSpeakerId();
	Integer getTopicId();
	String getArticleTitle();
	java.time.LocalDateTime getCreationDate();
	String getAuthorPseudonym();
	String getTopicTitle();
}
