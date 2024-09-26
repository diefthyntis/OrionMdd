import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Speaker } from 'src/app/dto/models/speaker.interface';
import { Subskription } from 'src/app/dto/models/subskription.class';
import { GenericResponse } from 'src/app/dto/response/genericResponse.interface';
import { ProductResponse } from 'src/app/dto/response/productResponse.interface';
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
public productResponseList!:ProductResponse[];



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
      let asyncSubskriptionList$=this.subskriptionService.getListProduct(this.connectedSpeaker.id);
      asyncSubskriptionList$.subscribe(returnedArrayByApi => {
        this.productResponseList=returnedArrayByApi;
        console.log("ProfileComponent.ngOnInit productResponseList=",this.productResponseList);
      })
  }


  unsubscribeToThisTopic(subskriptionId: string) {
    let asyncDeleteSubskiption$=this.subskriptionService.delete();
    asyncDeleteSubskiption$.subscribe((returnedResult:GenericResponse)=>{
      console.log("ProfileComponent.unsubscribeToThisTopic GenericResponse=",returnedResult.message);
    });
    throw new Error('Method not implemented.');
    }

}
