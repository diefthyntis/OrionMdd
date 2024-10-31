import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Speaker } from '../dto/models/speaker.interface';

import { LoginRequest } from '../dto/request/loginRequest.interface';
import { SpeakerResponse } from '../dto/response/speakerResponse.interface';
import { RegisterRequest } from '../dto/request/registerRequest.interface';
import { AuthSuccess } from '../dto/response/authSuccess.interface';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private token = 'aLaneSTnélE27aOut19SoiXAnteTrEiZE';
  private pathService = 'api/auth';
  //private tokenKey: string = 'aLaneSTnélE27aOut19SoiXAnteTrEiZE';
  private tokenKey: string = 'jwt';


  constructor(private httpClient: HttpClient) { }


  public register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/register`, registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    let apiLoginRoute: string = `${this.pathService}/login`;
    console.log("AuthService.login apiLoginRoute="+apiLoginRoute);
    console.log("AuthService.login loginRequest.login="+loginRequest.login);
    console.log("AuthService.login loginRequest.password="+loginRequest.password);
    let requetePost$!:Observable<any>;
    requetePost$=this.httpClient.post<AuthSuccess>(`${this.pathService}/login`, loginRequest);
    return requetePost$;
  }

  public me(): Observable<SpeakerResponse> {
    let apiUrl =`${this.pathService}/me`;
    console.log("AuthService.me apiUrl="+apiUrl)
    let speakerToCome=this.httpClient.get<SpeakerResponse>(apiUrl);
    return speakerToCome;
  }

  // Sauvegarde le token après la connexion de l'utilisateur
  saveToken(returnedTokenByApi: string): void {
    console.log("auth.service.ts.saveToken returnedTokenByApi="+returnedTokenByApi)
    sessionStorage.setItem(this.tokenKey, returnedTokenByApi);
  }

  // Récupère le token stocké
  getToken(): string {
    return sessionStorage.getItem(this.tokenKey) || '';
  }

  // Supprime le token (lors de la déconnexion par exemple)
  removeToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  logout() {
    this.removeToken();
    
  }

}
