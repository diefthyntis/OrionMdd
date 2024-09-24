import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Speaker } from '../dto/models/speaker.interface';



@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
 
  
  public connectedSpeaker: Speaker | undefined;
  

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(speaker: Speaker): void {
    this.connectedSpeaker = speaker;
    this.isLogged = true;
    this.next();
  }

  public logOut(): void {
    localStorage.removeItem('token');
    this.connectedSpeaker = undefined;
    this.isLogged = false;
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }

   // Méthode pour enregistrer le login dans SessionStorage
   setUserLogin(login: string): void {
    sessionStorage.setItem('userLogin', login);
  }

  // Méthode pour récupérer le login depuis SessionStorage
  getUserLogin(): string | null {
    return sessionStorage.getItem('userLogin'); // Renvoie null si aucun login n'est trouvé
  }

  // Méthode pour supprimer le login du SessionStorage lors de la déconnexion
  clearUserLogin(): void {
    sessionStorage.removeItem('userLogin');
  }

  public saveSpeakerId(speakerId: string): void {
    sessionStorage.setItem('speakerId', speakerId);
  }
}
