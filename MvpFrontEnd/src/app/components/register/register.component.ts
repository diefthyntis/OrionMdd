

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { Speaker } from 'src/app/dto/models/speaker.interface';
import { AuthSuccess } from 'src/app/dto/response/authSuccess.interface';
import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';



import { AuthService } from 'src/app/services/auth.service';
import { passwordValidator } from 'src/app/services/password.service';


import { SessionService } from 'src/app/services/session.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  public onError = false;


  public invalidFormMessage = false;  // Variable pour afficher le message "formulaire non valide"

/*
  Un mot de passe est valide si :
- son nombre de caractère est supérieur ou égal à 8 caractères ;
- il contient au moins un de chacun de ces types de caractères :
- chiffre,
- lettre minuscule,
- lettre majuscule,
- caractère spécial.
*/
  public buildedForm = this.fb.group({
    varEmailAddress: ['', [Validators.required, Validators.email]],
    varPseudonym: ['', [Validators.required, Validators.minLength(1)]],
    varPassword: ['', [Validators.required, Validators.minLength(8),passwordValidator]]
  });
  
    public informationMessage!: string;

  


  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService) { }


    /*
    Lorsque le formulaire est soumis, les valeurs sont récupérées 
    via this.form.value et castées en un objet de type RegisterRequest.
    */

  /*
    La méthode authService.register() est appelée pour envoyer les données à l'API.
    Si la requête réussit, le jeton d'authentification est stocké dans le localStorage, 
    et la méthode authService.me() est appelée pour récupérer les informations de l'utilisateur connecté. 
    Ensuite, l'utilisateur est redirigé vers la page /topics.
    En cas d'erreur, une variable onError est définie sur true, 
    ce qui peut être utilisé pour afficher un message d'erreur à l'utilisateur.
    */


  
  public submit(): void {
    console.log("RegisterComponent submit début");
    if (this.buildedForm.invalid) {
      this.invalidFormMessage = true; // Affiche le message d'erreur
      return;
    }
    //const registerRequest = this.buildedForm.value as RegisterRequest;
    const formValue = this.buildedForm.value;
    const registerRequest =  {emailaddress:formValue.varEmailAddress as string,password: formValue.varPassword as string,pseudonym:formValue.varPseudonym as string};
    

    
    this.authService.register(registerRequest).subscribe(
      (response: AuthSuccess) => {
          console.log("RegisterComponent token retourné par API=",response.content);
          this.authService.saveToken(response.content);
        //localStorage.setItem('token', response.token);
        this.informationMessage = "OK"
        //this.router.navigate(['/topics']);
      },
      error => {
          console.error("RegisterComponent Erreur lors de l'inscription");
          console.error("RegisterComponent Erreur lors du processus :", error);
          //alan@lyon.com=error.error;
          this.onError = true; // Gestion d'erreur pour l'interface utilisateur
        }
      );
    
  
  }

}
