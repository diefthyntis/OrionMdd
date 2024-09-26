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
      console.log("ChangeCredentialsComponent.updateCredentials","Le formulaire est invalide");
      this.bigErrorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
      return;
    }
    const formData = new FormData();

    //const id=this.connectedSpeaker.id;
    formData.append('speakerId', this.connectedSpeaker.id);

    const modificationDate=new Date();
    formData.append('modificationDate', modificationDate.toString());

    const pseudonym = this.buildedForm.value.varPseudonym;
    const emailaddress = this.buildedForm.value.varEmailaddress;
    const password = this.buildedForm.value.varPassword;

  
    if (pseudonym) {
      formData.append('pseudonym', pseudonym);
    } else {
      console.log("ChangeCredentialsComponent.updateCredentials",'Pseudonym est manquant');
    }
  
    if (emailaddress) {
      formData.append('emailAddress', emailaddress);
    } else {
      console.log("ChangeCredentialsComponent.updateCredentials",'Email est manquant');
    }
  
    if (password) {
      formData.append('password', password);
    } else {
      console.log("ChangeCredentialsComponent.updateCredentials",'Mot de passe est manquant');
    }

    console.log("ChangeCredentialsComponent.updateCredentials formData",formData);
  
    // Appel au service pour mettre à jour le profil, et abonnement à l'observable
    this.speakerService.updateSpeaker(formData).subscribe(
        GenericResponse => {
        console.log("ChangeCredentialsComponent.updateCredentials OK",GenericResponse);
        this.bigErrorMessage="Vos modifications ont été enregistrées"
        },
      error => {
        console.error("ChangeCredentialsComponent.updateCredentials KO",error);
      });
    
  }

    
    
}
