package com.diefthyntis.MinimumViableProduct.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.diefthyntis.MinimumViableProduct.dto.response.ProductResponse;
import com.diefthyntis.MinimumViableProduct.model.Speaker;
import com.diefthyntis.MinimumViableProduct.model.Subscription;



@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {

	List<Subscription> findBySpeaker(Speaker speaker);
	
	
    @Query(value = "SELECT s.id, t.title, t.description,t.id " +
            "FROM mvp.subscription s " +
            "JOIN mvp.topic t ON s.topicid = t.id " +
            "WHERE s.speakerid = :speakerId", nativeQuery = true)
List<ProductResponse> getProductList(@Param("speakerId") String speakerId);
	
	
}
