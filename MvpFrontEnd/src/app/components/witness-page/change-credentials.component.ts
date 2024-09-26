import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SpeakerService } from 'src/app/services/speaker.service';


@Component({
  selector: 'app-witness-page',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.scss']
})


export class ChangeCredentialsComponent implements OnInit {



  public bigErrorMessage:string="";
  public connectedSpeaker!:SpeakerResponse;

  public buildedForm = this.formBuilder.group({
    varEmailaddress: ['', [Validators.required, Validators.email]],
      varPseudonym: ['', [Validators.required, Validators.minLength(1)]],
      varPassword: ['', [Validators.required, Validators.minLength(1)]]
  });



  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,private speakerService:SpeakerService)
 { } 





  ngOnInit(): void {
    let asyncGetConnectedSpeaker$=this.authService.me();
    asyncGetConnectedSpeaker$.subscribe((returnedInstanceByApi:SpeakerResponse)=> {
      this.connectedSpeaker=returnedInstanceByApi;
      console.log("ProfileComponent.ngOnInit connectedSpeaker=",this.connectedSpeaker);
    } )
    
  }


  sayHello() {
    this.bigErrorMessage="Hello";
    }

    
  updateCredentials() {
      if (this.buildedForm.invalid) {
        console.log('Le formulaire est invalide');
        this.bigErrorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
        return;
      }
      const formData = new FormData();
      const pseudonym = this.buildedForm.value.varPseudonym;
      const email = this.buildedForm.value.varEmailaddress;
      const password = this.buildedForm.value.varPassword;
    
      if (pseudonym) {
        formData.append('pseudonym', pseudonym);
      } else {
        console.log('Pseudonym est manquant');
      }
    
      if (email) {
        formData.append('emailaddress', email);
      } else {
        console.log('Email est manquant');
      }
    
      if (password) {
        formData.append('password', password);
      } else {
        console.log('Mot de passe est manquant');
      }
    
     
      // Appel au service pour mettre à jour le profil, et abonnement à l'observable
      this.speakerService.updateSpeaker(formData).subscribe(
        GenericResponse => {
        console.log('Profil mis à jour avec succès', GenericResponse);
      },
      error => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    );  // Appel au service pour mettre à jour le profil, et abonnement à l'observable
    throw new Error('Method not implemented.');
    }
    
    
}
