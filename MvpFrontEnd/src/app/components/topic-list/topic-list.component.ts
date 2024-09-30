import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';


import { Topic } from 'src/app/dto/models/topic.class';
import { GenericResponse } from 'src/app/dto/response/genericResponse.interface';
import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';
import { SubskriptionResponse } from 'src/app/dto/response/subskriptionResponse.interface';
import { TopicResponse } from 'src/app/dto/response/topicResponse.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { SubskriptionService } from 'src/app/services/subskription.service';
import { TopicService } from 'src/app/services/topic.service';
import { DateTool } from 'src/app/tools/date.tool';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})

export class TopicListComponent implements OnInit {

public connectedSpeakerId!:string;
public informationMessage!:string;




   
  constructor(
    private sessionService: SessionService,
    private topicService: TopicService,
    private subskriptionService:SubskriptionService,
    private dateTool:DateTool,
    private authService:AuthService,
    private router:Router
  ) { }

  public topicList: Topic[] = [];
  public subskriptionList:string[]=[];

  ngOnInit() {
    this.loadTopic();
    
  }
 
  subscribeToThisTopic(topicId: string) {
    let subskriptionRequest = {
      speakerid: this.connectedSpeakerId,
      topicid:topicId as string
    };
    let requestPostSubskription$= this.subskriptionService.create(subskriptionRequest);
    console.log("TopicListComponent.subscribeToThisTopic subskriptionRequest.speakerid"+subskriptionRequest.speakerid); 
    console.log("TopicListComponent.subscribeToThisTopic subskriptionRequest.topicid"+subskriptionRequest.topicid);   
    requestPostSubskription$.subscribe(genericResponseReturnedByApi=> {
      let genericResponse:GenericResponse = genericResponseReturnedByApi;
      console.log("TopicListComponent.subscribeToThisTopic genericResponseReturnedByApi.message="+genericResponseReturnedByApi.message); 
      this.informationMessage="Déjà abonné !!";
      this.loadTopic();
     
    })
  }


  loadTopic() {
        // Observable 1 : Récupérer l'utilisateur connecté
    this.authService.me().pipe(
      // Une fois que l'utilisateur est récupéré, enchaîner la récupération des abonnements
      concatMap((speakerResponse:SpeakerResponse) => {
        this.connectedSpeakerId = speakerResponse.id;
        console.log("TopicListComponent.ngOnInit speakerResponse.id="+speakerResponse.id);
        // Observable 2 : Récupérer la liste des abonnements en fonction de l'utilisateur
        
        return this.subskriptionService.getListBySpeakerId(this.connectedSpeakerId);
      }),

      // Une fois que les abonnements sont récupérés, enchaîner la récupération des topics
      concatMap((list:SubskriptionResponse[]) => {
        console.log("TopicListComponent.ngOnInit subskriptionResponseList",list);
        list.forEach((subskriptionResponse: SubskriptionResponse) => {
          console.log("TopicListComponent.ngOnInit subskriptionResponse.topicid",subskriptionResponse.topicid);
          this.subskriptionList.push(subskriptionResponse.topicid);
        });
        console.log("TopicListComponent.ngOnInit this.subskriptionList",this.subskriptionList);
        // Observable 3 : Récupérer la liste des topics
        
        return this.topicService.getTopics();
      })
    ).subscribe({
      
      next: (list: TopicResponse[]) => {
        this.topicList=[];
        
        list.forEach((instance: TopicResponse) => {
          
          const oneTopic: Topic = new Topic(instance.id, instance.title, instance.description);
          if (this.subskriptionList.includes(instance.id)) {
            oneTopic.subskriptionActivated = true;
            oneTopic.informationMessage = "Déjà abonné!";
          }
          this.topicList.push(oneTopic);
        }
        
      );
      },
      complete: () => {
        console.log("TopicListComponent.loadTopic topicList=",this.topicList);
        console.log('Toutes les données ont été chargées.');
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données :', err);
      }
    });
    }
    

}

  