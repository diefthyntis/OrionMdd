import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { SessionService } from 'src/app/services/session.service';

import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthSuccess } from 'src/app/dto/response/authSuccess.interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  public hide = true;
  public onError:boolean = true;
  public informationMessage:string ="";

  /*
  on déclare ce que l'on veut mettre dans le formulaire
  */
  public buildedForm = this.fb.group({
    varEmailAddress: ['', [Validators.required, Validators.email]],
    varPassword: ['', [Validators.required]]
  });


  constructor(private authService: AuthService, 
    private fb: FormBuilder, 
    private router: Router,
    private sessionService: SessionService) { }



public submit(): void {
  console.log("LoginComponent.submit");

  if (this.buildedForm.invalid) {
    console.log("RegisterComponent.submit formulaire invalid",);
    this.informationMessage ="Please fill email address and password";
    this.onError = true; // Affiche le message d'erreur
    return;
  }

  const formValue = this.buildedForm.value;
  console.log(formValue);
  const loginRequest = {login:formValue.varEmailAddress as string,
                    password: formValue.varPassword as string};
  this.authService.login(loginRequest).subscribe(
    (response: AuthSuccess) => {
      this.authService.saveToken(response.content);
      console.log("login.component.ts.submit token sauvegardé");
      this.router.navigate(['/articleContainer']);
      console.log("login.component.ts.submit redirection vers witness termninée");
    },
    (error) => {
      console.error("login.component.ts.submit Erreur lors de la connexion", error);
      this.informationMessage=error.error;
      this.onError = true;
      ;
    }
  );
}

onInputClick() {
  this.onError = false; // Gestion d'erreur pour l'interface utilisateur
  //throw new Error('Method not implemented.');
  this.informationMessage="";
  }

}