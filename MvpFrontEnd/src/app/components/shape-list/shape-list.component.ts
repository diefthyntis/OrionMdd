import { Component, OnInit } from '@angular/core';
import { concatMap, switchMap } from 'rxjs';
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
    this.authService.me().pipe(
      concatMap((returnedInstanceByApi: SpeakerResponse) => {
        this.connectedSpeaker = returnedInstanceByApi;
        console.log("ShapeListComponent.ngOnInit connectedSpeaker=", this.connectedSpeaker);
  
        // Maintenant que `this.connectedSpeaker.id` est défini, fais l'appel suivant
        return this.subskriptionService.getShapeList(this.connectedSpeaker.id);
      })
    ).subscribe(returnedArrayByApi => {
      this.shapeResponseList = returnedArrayByApi;
      console.log("ShapeListComponent.ngOnInit productResshapeResponseListponseList=", this.shapeResponseList);
    }, error => {
      console.error("ShapeListComponent.ngOnInit Erreur lors du chargement de la liste des shapes :", error);
      // Gérer l'erreur ici
    });
  }

  unsubscribeToThisTopic(subscriptionId: string) {
    console.log("ShapeListComponent.unsubscribeToThisTopic subscriptionId=",subscriptionId);
    let asyncDeleteSubskription$=this.subskriptionService.delete(subscriptionId);
    asyncDeleteSubskription$.subscribe(
      (returnedResult:GenericResponse)=>{
      console.log("ProfileComponent.unsubscribeToThisTopic GenericResponse=",returnedResult.message);
      const index = this.shapeResponseList.findIndex(obj => obj.subscriptionId === subscriptionId);
      if (index !== -1) {
        this.shapeResponseList.splice(index, 1);
      }
    });
  }



}
