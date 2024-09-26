import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SpeakerService } from 'src/app/services/speaker.service';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.scss']
})
export class SpeakerDetailComponent implements OnInit {

  public buildedForm = this.formBuilder.group({
    varEmailaddress: ['', [Validators.required, Validators.email]],
      varPseudonym: ['', [Validators.required, Validators.minLength(1)]],
      varPassword: ['', [Validators.required, Validators.minLength(1)]]
  })
  public bigErrorMessage:string="";
  public connectedSpeaker!:SpeakerResponse;

  
  
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private speakerService:SpeakerService
) { }

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
}







