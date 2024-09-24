import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Speaker } from 'src/app/dto/models/speaker.interface';
import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';
import { SubskriptionResponse } from 'src/app/dto/response/subskriptionResponse.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SubskriptionService } from 'src/app/services/subskription.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

public buildedForm = this.formBuilder.group({
  varEmailAddress: ['',[Validators.required,Validators.email]],
  varPseudonym:['',Validators.required]
})
public bigErrorMessage:string="";
public connectedSpeaker!:SpeakerResponse;
public subskriptionResponseList!:SubskriptionResponse[];

submit() {
throw new Error('Method not implemented.');
}

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private subskriptionService:SubskriptionService
  ) { }

  ngOnInit(): void {
      let asyncConnectedSpeaker$=this.authService.me();
      asyncConnectedSpeaker$.subscribe((returnedInstanceByApi:SpeakerResponse)=> {
        this.connectedSpeaker=returnedInstanceByApi;
        console.log("ProfileComponent.ngOnInit connectedSpeaker=",this.connectedSpeaker);
      } )
      let asyncSubskriptionList$=this.subskriptionService.getListBySpeakerId(this.connectedSpeaker.id);
      asyncSubskriptionList$.subscribe(returnedArrayByApi => {
          this.subskriptionResponseList=returnedArrayByApi;
          console.log("ProfileComponent.ngOnInit subskriptionResponseList=",this.subskriptionResponseList);
      })
  }

}
