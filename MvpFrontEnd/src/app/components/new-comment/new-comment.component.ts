import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Topic } from 'src/app/dto/models/topic.class';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';
import { Article } from 'src/app/dto/models/article.class';
import { ArticleService } from 'src/app/services/article.service';
import { DateTool } from 'src/app/tools/date.tool';

import { ActivatedRoute, Router } from '@angular/router';

import { CommentService } from 'src/app/services/comment.service';
import { concatMap } from 'rxjs';
import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';
import { ArticleResponse } from 'src/app/dto/response/articleResponse.interface';
import { CommentResponse } from 'src/app/dto/response/CommentResponse.interface';
import { Komment } from 'src/app/dto/models/komment.class';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  // Utilisation de ViewChild pour accéder au bouton de soumission
  @ViewChild('submitButton') submitButton: any;
  


  public articleTitle!: string;
  public currentTopic!: Topic;
  public connectedSpeaker!:SpeakerResponse;
  public currentArticle!:ArticleResponse;
  public bigErrorMessage?:string="";
  public selectedOption: string = "";
  public createdComment!:CommentResponse;
  public articleId!:string;
  public connectedSpeakerId!:string;
  public information!: string;
  
  

  @Output() childEventEmitter = new EventEmitter<any>();

  public showSuccessMessage: boolean = false;
  public laius!: string;
  public showCharCount: boolean=false;
  public charCount: number = 255;
  public showInformationMessage: boolean = false;
  public informationMessage!:string;
  



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
    varSentence:['Ecrivez ici votre commentaire',[Validators.required]]}
  )






  submit() {
    console.log("NewCommentComponent.submit début");
    this.showInformationMessage = false;
    if (this.buildedForm.invalid) {
      this.showInformationMessage = true; // Affiche le message d'erreur
      this.informationMessage="Merci de remplir tous les champs";
      console.log("NewCommentComponent.submit Formulaire non valide");
      return;
    }
    else {
      const formValue = this.buildedForm.value;
      const commentRequest =  {
        sentence:formValue.varSentence as string,
        speakerid: this.connectedSpeaker.id.toString(),
        articleid:this.articleId as string,
        creationdate:this.dateTool.getCurrentDate() as string,
      };
      console.log('NewCommentComponent.submit this.connectedSpeaker.id=',this.connectedSpeaker.id);
      console.log('NewCommentComponent.submit this.articleId=',this.articleId);
      let commentToBeCreated$ = this.commentService.create(commentRequest);
      commentToBeCreated$.subscribe(
        (returnedCommentResponseByApi)  => { 
          this.createdComment = returnedCommentResponseByApi;
          console.log('new-comment.component.ts.submit returnedCommentResponseByApi=',returnedCommentResponseByApi);
          const oneKomment = new Komment(
            returnedCommentResponseByApi.commentId,
            returnedCommentResponseByApi.sentence,
            returnedCommentResponseByApi.creationDate,
            returnedCommentResponseByApi.modificationDate,
            returnedCommentResponseByApi.speakerId,
            this.connectedSpeaker.pseudonym
          );
          console.log('NewCommentComponent.submit oneKomment=',oneKomment);
          
          
          //this.buildedForm.reset();
          //this.buildedForm.enable();

          
          this.childEventEmitter.emit(oneKomment);
          //this.buildedForm.get('articleTitle')?.setValue(''); // Clear articleTitle
          //this.buildedForm.get('varSentence')?.setValue('');  // Clear varSentence
          this.laius= "";
          this.charCount=0;
          this.showCharCount = false;
          this.informationMessage ="Votre commentaire a été enregistré !"

          this.showInformationMessage = true;

           setTimeout(() => {
            this.showInformationMessage = false;
            //this.buildedForm.reset();
          }, 3000); // 15 000 ms = 15 secondes

          
          //this.createdComment = { }; // Réinitialiser le formulaire
          //
        },
        (error) => {
          // Gestion des erreurs retournées par l'API
          console.error('NewCommentComponent.submit ##ERR##', error);
          this.bigErrorMessage = error.error; // Affiche le message d'erreur
        }
      )
    }
  }


  


  updateCharCount() {
    this.showInformationMessage = true;
    const sentenceControl = this.buildedForm.get('varSentence');
    if (sentenceControl) {
      const tmp=(sentenceControl.value?.length || 0);
      this.charCount = 255 - (sentenceControl.value?.length || 0);
      //this.informationMessage = this.charCount + " caractères restants";

    if (this.charCount < 0 ) {
      this.informationMessage = tmp + " caractères. Merci de supprimer des caractères, 250 max" 
    }
    else {
      this.informationMessage = this.charCount + " caractères restants";
    }
  }
  }

  submitForm() {
    this.submitButton.nativeElement.click();
  }

}
