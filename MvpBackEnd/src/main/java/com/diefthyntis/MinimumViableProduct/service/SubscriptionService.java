package com.diefthyntis.MinimumViableProduct.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.diefthyntis.MinimumViableProduct.model.Shape;
import com.diefthyntis.MinimumViableProduct.model.Speaker;
import com.diefthyntis.MinimumViableProduct.model.Subscription;
import com.diefthyntis.MinimumViableProduct.repository.SubscriptionRepository;


import lombok.RequiredArgsConstructor;

/*
 * RequiredArgsConstructor à ajouter pour avoir une injection de dépendance par constructeur
 */

@Service
@RequiredArgsConstructor
public class SubscriptionService {

	private final SubscriptionRepository subscriptionRepository;

	
	public void save(Subscription subscription) {
		subscriptionRepository.save(subscription);
	}
	
	public List<Subscription> getSubscriptionsBySpeaker(Speaker speaker) {

		return subscriptionRepository.findBySpeaker(speaker);
	}
	
	public void delete(Integer id) {
		subscriptionRepository.deleteById(id);
	}

	public List<Shape> getShapeList(Integer speakerId) {
		//final List<Shape> shapeList = new ArrayList<Shape>();
		final List<Shape> shapeList =subscriptionRepository.getShapeList(speakerId);
		return shapeList;
        //return subscriptionRepository.getShapeList(speakerId);
		//return subscriptionRepository.getShapeListWithLog(speakerId);
    }

}
