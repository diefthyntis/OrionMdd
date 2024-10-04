/*
 =====================================================================================
 Ce code source définit une classe utilitaire pour la gestion des JSON Web Tokens (JWT) 
 dans une application Spring Boot avec des fonctionnalités de sécurité. 
 Voici une explication détaillée de ce que fait chaque partie du code :

    Imports :
        Les importations incluent des classes nécessaires pour manipuler les dates, la journalisation, 
        l'authentification, et la manipulation des JWT.

    Classe JwtUtils :
        La classe est annotée avec @Component, ce qui permet à Spring de la détecter et de la gérer en tant que bean.

    Logger :
        Un logger est défini pour enregistrer les messages d'erreur ou d'information.

    Propriétés :
        Deux propriétés sont injectées depuis le fichier de configuration (application.properties), 
        à savoir jwtSecret (la clé secrète utilisée pour signer les JWT) 
        et jwtExpirationMs (la durée de validité du token en millisecondes).

    Méthode generateJsonWebToken :
        Cette méthode génère un JWT en utilisant les informations d'authentification de l'utilisateur.
        Elle extrait le nom d'utilisateur des détails de l'utilisateur (Internaut), 
        et utilise la bibliothèque io.jsonwebtoken pour créer un token avec :
            Le nom d'utilisateur comme sujet.
            La date actuelle comme date d'émission.
            Une date d'expiration calculée à partir de la date actuelle et de jwtExpirationMs.
            Le token est signé avec une clé générée à partir de jwtSecret en utilisant 
            l'algorithme HS256.

    Méthode key :
        Cette méthode génère une clé secrète à partir de jwtSecret 
        en le décodant avec l'algorithme BASE64 et en utilisant Keys.hmacShaKeyFor.

    Méthode getUserNameFromJsonWebToken :
        Cette méthode extrait le nom d'utilisateur (sujet) d'un token JWT.
        Elle parse le token en utilisant la clé secrète pour le valider et récupère le sujet
         (nom d'utilisateur) du corps du token.

    Méthode validateJsonWebToken :
        Cette méthode valide un token JWT.
        Elle essaie de parser le token avec la clé secrète et retourne true si le token est valide.
        En cas d'exception (token mal formé, expiré, non supporté 
        ou avec une chaîne de revendications vide), 
        elle capture l'exception, enregistre un message d'erreur, et retourne false.

En résumé, la classe JwtUtils fournit des méthodes pour générer des tokens JWT, extraire des informations d'un token, et valider les tokens. Ces utilitaires sont couramment utilisés dans des applications sécurisées pour authentifier les utilisateurs et gérer les sessions de manière stateless.
=========================================================================================
 */

package com.diefthyntis.MinimumViableProduct.util;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import com.diefthyntis.MinimumViableProduct.security.Internaut;



import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;






/*
 Remember that we’ve added bezkoder.app.jwtSecret and bezkoder.app.jwtExpirationMs 
 properties in application.properties file, and jwtSecret has 64 characters.
 */

@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${diefthyntis.app.secret}")
  private String jwtSecret;

  @Value("${diefthyntis.app.expiration}")
  private int jwtExpiration;
  
  @Value("${diefthyntis.app.jwtCookieName}")
  private String jwtCookie;

  public String generateJsonWebToken(Authentication authentication) {

    Internaut userPrincipal = (Internaut) authentication.getPrincipal();

    return Jwts.builder()
        .setSubject((userPrincipal.getUsername()))
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + jwtExpiration))
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
    /*
     * Jwts.builder est une méthode statique
     * elle prend les infos nécessaires pour les distribuer entre le header, le payload et la signature
     */
  }
  
  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String getUserNameFromJsonWebToken(String token) {
    return Jwts.parserBuilder().setSigningKey(key()).build()
               .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJsonWebToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
      return true;
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }
  
  public String getJwtFromCookies(HttpServletRequest request) {
	    Cookie cookie = WebUtils.getCookie(request, jwtCookie);
	    if (cookie != null) {
	      return cookie.getValue();
	    } else {
	      return null;
	    }
	  }
  
  public ResponseCookie generateJwtCookie(Internaut userPrincipal) {
	    String jwt = generateTokenFromUsername(userPrincipal.getUsername());
	    ResponseCookie cookie = ResponseCookie.from(jwtCookie, jwt).path("/api").maxAge(24 * 60 * 60).httpOnly(true).build();
	    return cookie;
	  }

	  public ResponseCookie getCleanJwtCookie() {
	    ResponseCookie cookie = ResponseCookie.from(jwtCookie, null).path("/api").build();
	    return cookie;
	  }

	  public String generateTokenFromUsername(String username) {   
		    return Jwts.builder()
		              .setSubject(username)
		              .setIssuedAt(new Date())
		              .setExpiration(new Date((new Date()).getTime() + jwtExpiration))
		              .signWith(key(), SignatureAlgorithm.HS256)
		              .compact();
		  }
}
