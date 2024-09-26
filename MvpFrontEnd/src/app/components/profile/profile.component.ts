import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GenericResponse } from 'src/app/dto/response/genericResponse.interface';
import { ShapeResponse } from 'src/app/dto/response/shapeResponse.interface';

import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';

import { AuthService } from 'src/app/services/auth.service';
import { SpeakerService } from 'src/app/services/speaker.service';
import { SubskriptionService } from 'src/app/services/subskription.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


public updateSpeakerForm = this.formBuilder.group({
  varEmailaddress: ['', [Validators.required, Validators.email]],
    varPseudonym: ['', [Validators.required, Validators.minLength(1)]],
    varPassword: ['', [Validators.required, Validators.minLength(1)]]
})
public bigErrorMessage:string="";
public connectedSpeaker!:SpeakerResponse;
public shapeResponseList!:ShapeResponse[];



  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private subskriptionService:SubskriptionService,
              private speakerService:SpeakerService
  ) { }

  ngOnInit(): void {
  
      let asyncGetConnectedSpeaker$=this.authService.me();
      asyncGetConnectedSpeaker$.subscribe((returnedInstanceByApi:SpeakerResponse)=> {
        this.connectedSpeaker=returnedInstanceByApi;
        console.log("ProfileComponent.ngOnInit connectedSpeaker=",this.connectedSpeaker);
      } )
      let asyncGetShapeList$=this.subskriptionService.getShapeList(this.connectedSpeaker.id);
      asyncGetShapeList$.subscribe(returnedArrayByApi => {
        this.shapeResponseList=returnedArrayByApi;
        console.log("ProfileComponent.ngOnInit productResponseList=",this.shapeResponseList);
      })
  
  }


  unsubscribeToThisTopic(subskriptionId: string) {
    let asyncDeleteSubskription$=this.subskriptionService.delete(subskriptionId);
    asyncDeleteSubskription$.subscribe((returnedResult:GenericResponse)=>{
      console.log("ProfileComponent.unsubscribeToThisTopic GenericResponse=",returnedResult.message);
      const index = this.shapeResponseList.findIndex(obj => obj.subskriptionId === subskriptionId);
      if (index !== -1) {
        this.shapeResponseList.splice(index, 1);
      }
    });
  }

  updateProfile() {
    if (this.updateSpeakerForm.invalid) {
      console.log('Le formulaire est invalide');
      this.bigErrorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
      return;
    }
    const formData = new FormData();
    const pseudonym = this.updateSpeakerForm.value.varPseudonym;
    const email = this.updateSpeakerForm.value.varEmailaddress;
    const password = this.updateSpeakerForm.value.varPassword;
  
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
}
  
    

}
