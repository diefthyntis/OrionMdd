import { Component, OnInit } from '@angular/core';
import { GenericResponse } from 'src/app/dto/response/genericResponse.interface';
import { ShapeResponse } from 'src/app/dto/response/shapeResponse.interface';
import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SpeakerService } from 'src/app/services/speaker.service';
import { SubskriptionService } from 'src/app/services/subskription.service';

@Component({
  selector: 'app-shape-list',
  templateUrl: './shape-list.component.html',
  styleUrls: ['./shape-list.component.scss']
})
export class ShapeListComponent implements OnInit {



public bigErrorMessage:string="";
public connectedSpeaker!:SpeakerResponse;
public shapeResponseList!:ShapeResponse[];



  constructor(private authService:AuthService,private speakerService:SpeakerService,
      private subskriptionService:SubskriptionService
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



}
