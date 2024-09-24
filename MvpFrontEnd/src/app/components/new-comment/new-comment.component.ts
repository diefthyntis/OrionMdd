import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Topic } from 'src/app/dto/models/topic.class';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';
import { TopicComponent } from '../topic/topic.component';
import { Article } from 'src/app/dto/models/article.class';
import { ArticleService } from 'src/app/services/article.service';
import { DateTool } from 'src/app/tools/date.tool';

import { ActivatedRoute, Router } from '@angular/router';

import { CommentService } from 'src/app/services/comment.service';
import { concatMap } from 'rxjs';
import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';
import { ArticleResponse } from 'src/app/dto/response/articleResponse.interface';
import { KommentResponse } from 'src/app/dto/response/kommentResponse.interface';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  public articleTitle!: string;
  public currentTopic!: Topic;
  public connectedSpeaker!:SpeakerResponse;
  public currentArticle!:ArticleResponse;
  public bigErrorMessage?:string="";
  public selectedOption: string = "";
  public createdComment!:KommentResponse;
  public articleId!:string;
  public connectedSpeakerId!:string;

/*
console.log("Z new-article.component.ts.ngOnInit début");
console.log("B new-comment.component.ts.ngOnInit params="+params);
    console.log("C new-comment.component.ts.ngOnInit currentArticle="+this.currentArticle);
     console.log("A new-article.component.ts.ngOnInit speakerId="+this.connectedSpeaker.id);
*/
    /*
    let speakerToCome$ = this.authService.me();

    speakerToCome$.subscribe(valueReturnedByApi => {
      this.connectedSpeaker = valueReturnedByApi;
     
      });
    */

      ngOnInit(): void {
        

        // Utilisation de concatMap pour enchainer la lecture des paramètres et l'appel à l'API
        this.parentRoute.paramMap.pipe(
          // Récupérer les paramètres de route (speakerId et articleId)
          concatMap(params => {
            console.log("new-comment.component.ts.ngOnInit params="+this.parentRoute.params);
            params.keys.forEach(key => {
              console.log("new-comment.component.ts.ngOnInit key="+key);
            });

            this.connectedSpeakerId = params.get('speakerId') ?? "";
            this.articleId = params.get('articleId') ?? "";
            console.log("new-comment.component.ts.ngOnInit articleId="+this.articleId);
            
            // Ensuite, faire l'appel à l'API pour récupérer le détail de l'article
            return this.articleService.detail(this.articleId);
          }),
          concatMap(articleResponseReturnedByApi => {
            // Stocker l'article retourné par l'API
            this.currentArticle = articleResponseReturnedByApi;
      
            // Maintenant, faire l'appel pour récupérer le speaker
            return this.authService.me();
          })
        ).subscribe(returnedSpeakerResponseByApi => {
          // Assigner le résultat à la propriété currentArticle
          this.connectedSpeaker = returnedSpeakerResponseByApi;
        });
      }

  constructor(
    private formBuilder:FormBuilder,
    private authService: AuthService,
    private topicService:TopicService,
    private commentService:CommentService,
    private dateTool:DateTool,
    private router: Router,
    private parentRoute:ActivatedRoute,
    private articleService:ArticleService

  ) { }
 
  
public invalidFormMessage = false;  // Variable pour afficher le message "formulaire non valide"

  public buildedForm = this.formBuilder.group({
    articleTitle: ['Plus tard est impossible',[Validators.required]],
    varSentence:['Le prochain JB à sortir en 2025',[Validators.required]]}
  )






  submit() {
    console.log("new-comment.component.ts.submit début");
  
    if (this.buildedForm.invalid) {
      this.invalidFormMessage = true; // Affiche le message d'erreur
      this.bigErrorMessage="Veuillez sélectionner une option et remplir tous les champs";
      return;
    }
    else {
      const formValue = this.buildedForm.value;
      const commentRequest =  {
        sentence:formValue.varSentence as string,
        speakerid: this.connectedSpeaker.id.toString(),
        articleid:this.articleId as string,
        creationdate:this.dateTool.getCurrentDate() as string
      };
      console.log('new-comment.component.ts.submit commentRequest.articleid='+commentRequest.articleid);
      let commentToBeCreated$ = this.commentService.create(commentRequest);
      commentToBeCreated$.subscribe(
        (returnedCommentResponseByApi)  => { 
          this.createdComment = returnedCommentResponseByApi;
          console.log('new-comment.component.ts.submit createdComment='+this.createdComment);
          this.router.navigate(['/commentList',this.connectedSpeaker.id,this.articleId]);
        },
        (error) => {
          // Gestion des erreurs retournées par l'API
          console.error('new-comment.component.ts.submit ##ERR##', error);
          this.bigErrorMessage = error.error; // Affiche le message d'erreur
        }
      )
    }
  }
}
