package com.diefthyntis.MinimumViableProduct.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.diefthyntis.MinimumViableProduct.model.Article;
import com.diefthyntis.MinimumViableProduct.model.Blurb;
import com.diefthyntis.MinimumViableProduct.model.Shape;
import com.diefthyntis.MinimumViableProduct.model.Speaker;



@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

	List<Article> findBySpeaker(Speaker speaker);
	

	
	@Query(value = "SELECT "
			+ "article.id as articleId, "
			+ "article.sentence as sentence, "
			+ "article.speakerid as speakerId, "
			+ "article.topicid as TopicId, "
			+ "article.title as articleTitle, "
			+ "article.creationdate as creationDate, "
			+ "speaker.pseudonym as authorPseudonym, "
			+ "topic.title as topicTitle "
			+ "FROM mvp.article,mvp.speaker,mvp.topic "
			+ "where "
			+ "article.topicid = topic.id and "
			+ "article.speakerid = speaker.id and "
			+ "article.id = :articleId", nativeQuery = true)
    Blurb getOneBlurb(@Param("articleId") Integer speakerId);
}
