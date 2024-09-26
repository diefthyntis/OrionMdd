package com.diefthyntis.MinimumViableProduct.repository;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.diefthyntis.MinimumViableProduct.model.Shape;
import com.diefthyntis.MinimumViableProduct.model.Speaker;
import com.diefthyntis.MinimumViableProduct.model.Subscription;



@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {

	List<Subscription> findBySpeaker(Speaker speaker);
	
	Logger logger = LoggerFactory.getLogger(SubscriptionRepository.class);
	
	
    @Query(value = "SELECT s.id as subscriptionId, t.title as topicTitle, t.description as topicDescription,t.id as topicId " +
            "FROM mvp.subscription s " +
            "JOIN mvp.topic t ON s.topicid = t.id " +
            "WHERE s.speakerid = :speakerId", nativeQuery = true)
    List<Shape> getShapeList(@Param("speakerId") Integer speakerId);
    
    
	/*
    @Query(value = "SELECT s.id, t.title, t.description,t.id" +
            " FROM mvp.subscription s " +
            "JOIN mvp.topic t ON s.topicid = t.id " +
            "WHERE s.speakerid = :speakerId", nativeQuery = true)
    List<Shape> getShapeList(@Param("speakerId") Integer speakerId);
    */
    
    
    /*
    default List<Shape> getShapeListWithLog(Integer speakerId) {
        logger.info("Executing query for speakerId: {}", speakerId);
        return getShapeList(speakerId);
    }
	*/
	
}
