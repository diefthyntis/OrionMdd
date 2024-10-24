package com.diefthyntis.MinimumViableProduct.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diefthyntis.MinimumViableProduct.model.Speaker;
import com.diefthyntis.MinimumViableProduct.repository.SpeakerRepository;




/*
 * In the code, we get full custom User object using UserRepository, 
 * then we build a UserDetails object using static build() method.
 */

@Service
public class InternautService implements UserDetailsService {
  @Autowired
  SpeakerRepository speakerRepository;

  /*
  @Override
  @Transactional
  public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
    Speaker speaker = speakerRepository.findByLogin(login)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with login: " + login));

    
    return Internaut.build(speaker);
  }
*/

@Override
@Transactional
public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
    // Vérifiez si l'identifiant est un e-mail ou un pseudonyme
    Speaker speaker;
    if (isEmail(identifier)) {
        // Recherche par adresse e-mail
        speaker = speakerRepository.findByEmailaddress(identifier)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email address: " + identifier));
    } else {
        // Recherche par pseudonyme
        speaker = speakerRepository.findByPseudonym(identifier)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with pseudonym: " + identifier));
    }

    // Utilisation de la méthode statique pour construire l'objet UserDetails
    return Internaut.build(speaker);
}

// Méthode utilitaire pour vérifier si l'identifiant est une adresse e-mail
private boolean isEmail(String identifier) {
    return identifier.contains("@");
}

}