package com.diefthyntis.MinimumViableProduct.controller;




import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.diefthyntis.MinimumViableProduct.dto.request.SubscriptionRequest;


import com.diefthyntis.MinimumViableProduct.dto.response.ShapeResponse;
import com.diefthyntis.MinimumViableProduct.dto.response.ServerResponse;
import com.diefthyntis.MinimumViableProduct.dto.response.SubscriptionResponse;
import com.diefthyntis.MinimumViableProduct.mapping.SubscriptionMapping;
import com.diefthyntis.MinimumViableProduct.model.Shape;
import com.diefthyntis.MinimumViableProduct.model.Speaker;
import com.diefthyntis.MinimumViableProduct.model.Subscription;
import com.diefthyntis.MinimumViableProduct.service.SpeakerService;
import com.diefthyntis.MinimumViableProduct.service.SubscriptionService;
import com.diefthyntis.MinimumViableProduct.util.NumberUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*
 * @RequiredArgsConstructor permet d'avoir un constructeur avec la dépendance "final" injectée 
 * "dépendance" est en fait une déclaration de classe de type service "service, repository ou mapping
 * @RequiredArgsConstructor permet de ne pas avoir à créer le constructeur chargé d'instancier subscriptionService et subscriptionMapping
 */

/*
 * @Slf4j permet d'injecter un loggueur
 */

/*
 * Il y autant de thread que d'utilisateurs connecté
 * L'information de l'utilisateur connecté est disponible dans l'interface Principal
 */



@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class SubscriptionController {
	private final SubscriptionService subscriptionService;
	private final SubscriptionMapping subscriptionMapping;
	private final SpeakerService speakerService;
	
	@PostMapping("/newSubscription")
    public ResponseEntity<ServerResponse> create(final @RequestBody SubscriptionRequest subscriptionRequest) throws IOException, java.io.IOException {
		log.info("début de la création de l'abonnement");
			
		/*
		 * l'objet SubscriptionRequest est posté par le FrontEnd et reçu par le controller
		 */
		
		final Subscription subscription = subscriptionMapping.mapSubscriptionRequestToSubscription(subscriptionRequest);
		subscriptionService.save(subscription);
			
		
		return ResponseEntity.ok(new ServerResponse("Subscription send with success"));
      
    }
	
	@GetMapping("/subscriptionListBySpeakerId")
	public List<SubscriptionResponse> getSubscriptions (final Principal principal) {
		final String emailAddress = principal.getName();
		final Speaker speaker = speakerService.findByEmailaddress(emailAddress);
		final List<Subscription> subscriptionsList = subscriptionService.getSubscriptionsBySpeaker(speaker);
		final List<SubscriptionResponse> subscriptionResponseList =new ArrayList<SubscriptionResponse>();
		
		subscriptionsList.stream().forEach(subscription -> {
			final SubscriptionResponse subscriptionResponse= subscriptionMapping.mapSubscriptionToSubscriptionResponse(subscription);
			subscriptionResponseList.add(subscriptionResponse);
		});
		return subscriptionResponseList;
		
	}
	
	@DeleteMapping("/deleteSubscription/{subscriptionId}")
	public ResponseEntity<ServerResponse> delete (@PathVariable String subscriptionId) {
		log.info("### susbscriptionId",subscriptionId);
		final Integer integerId=NumberUtils.convertToInteger(subscriptionId);
		subscriptionService.delete(integerId);
		final String sentence = "Subscription #" + subscriptionId + " has been deleted";
		return ResponseEntity.ok(new ServerResponse(sentence));
		
	}
	

	
	
	@GetMapping("/shapeList/{speakerId}")
	public List<ShapeResponse> getShapeList (@PathVariable String speakerId) {
		log.info("### speakerId",speakerId);
		final Integer integerId= NumberUtils.convertToInteger(speakerId);
		log.info("### integerId",integerId);
		final List<Shape> shapeList = subscriptionService.getShapeList(integerId);
		
		final List<ShapeResponse> shapeResponseList =new ArrayList<ShapeResponse>();
		
		/*
		final ShapeResponse shapeResponse = new ShapeResponse();
		shapeResponse.setSubscriptionId("1");
		shapeResponse.setTopicId("1");
		shapeResponse.setTopicTitle("JB");
		shapeResponse.setTopicDescription("Le plus gentleman des espions");
		shapeResponseList.add(shapeResponse);
		*/
		
		
		shapeList.stream().forEach(shape -> {
			
			final ShapeResponse shapeResponse= subscriptionMapping.mapShapeToShapeResponse(shape);
			shapeResponseList.add(shapeResponse);
		});
		
		
		
		return shapeResponseList;
	
	}
	
		
	
}
