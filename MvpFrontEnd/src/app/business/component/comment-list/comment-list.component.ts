import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, concatMap, Observable } from 'rxjs';


import { Article } from 'src/app/business/dto/model/article.class';

import { ArticleResponse } from 'src/app/business/dto/response/articleResponse.interface';
import { CommentResponse } from 'src/app/business/dto/response/CommentResponse.interface';

import { SpeakerResponse } from 'src/app/business/dto/response/speakerResponse.interface';

import { CommentService } from 'src/app/business/service/comment.service';
import { DateTool } from 'src/app/shared/tools/date.tool';
import { Komment } from '../../dto/model/komment.class';
import { AuthService } from 'src/app/security/service/auth.service';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  
  @Input() speakerIdToReceive:string | undefined;
  @Input() articleIdToReceive:string | undefined;

  @Input() childCommentList: Komment[]=[];



  public connectedSpeaker!:SpeakerResponse;
  //public kommentList:Komment[]=[];
  public bigErrorMessage?:string="";
  public currentArticle!:ArticleResponse;
  public connectedSpeakerId!:string;
  public currentArticleId!:string;
  public articleTitle!:string;
  
  //private updateCommentListSubject = new BehaviorSubject<Komment[]>([]);
  //private asyncGetCommentList$: Observable<Komment[]> = this.updateCommentListSubject.asObservable();
  private kommentResponseList:CommentResponse[]=[];

  constructor(private commentService: CommentService,
    private authService: AuthService, 
    private router: Router,
    private parentRoute: ActivatedRoute,
    private articleService:ArticleService,
    private dateTool:DateTool

  ) { }

    ngOnInit(): void {

      console.log("### comment-list.component.ts.ngOnInit speakerIdToReceive=" + this.speakerIdToReceive);
      console.log("### comment-list.component.ts.ngOnInit articleIdToReceive=" + this.articleIdToReceive);
      // Utilisation de paramMap pour récupérer les paramètres et enchaîner les appels via concatMap
      this.parentRoute.paramMap.pipe(
        concatMap(params => {
          console.log("CommentListComponent.ngOnInit",params);
 
          // Retourner l'observable de l'appel à authService.me() pour continuer avec concatMap
          return this.authService.me();
        }),
        concatMap(speakerResponseReturnedByApi => {
          // Attribuer la réponse du speaker
          this.connectedSpeaker = speakerResponseReturnedByApi;
          console.log("comment-list.component.ts.ngOnInit speakerResponseReturnedByApi.id=" + speakerResponseReturnedByApi.id);
          // Retourner l'observable de l'appel pour obtenir les détails de l'article
          return this.articleService.detail(this.articleIdToReceive ?? '');
        }),
        concatMap(articleResponseReturnedByApi => {
          console.log("comment-list.component.ts.ngOnInit articleResponseReturnedByApi.title=" + articleResponseReturnedByApi.title);
          //this.currentArticle =articleResponseReturnedByApi;
          this.articleTitle =articleResponseReturnedByApi.title;
          // Créer l'objet Article avec la réponse de l'API
          /*
          this.currentArticle = new Article(
            articleResponseReturnedByApi.id,
            articleResponseReturnedByApi.title,
            articleResponseReturnedByApi.sentence,
            articleResponseReturnedByApi.speakerid,
            articleResponseReturnedByApi.topicid,
            articleResponseReturnedByApi.creationdate,
            articleResponseReturnedByApi.modificationdate
          );
          */
    
          // Retourner l'observable de la liste des commentaires de l'article
          return this.commentService.getListByArticleId(this.articleIdToReceive ?? '');
        })).subscribe(returnedCommentListByApi => {
        // Parcourir les commentaires et les ajouter à la liste
        returnedCommentListByApi.forEach((commentResponse: CommentResponse) => {
          console.log("comment-list.component.ts.ngOnInit returnedCommentListByApi=",returnedCommentListByApi);
    
          const oneKomment = new Komment(
            commentResponse.commentId,
            commentResponse.sentence,
            commentResponse.creationDate,
            commentResponse.modificationDate,
            commentResponse.speakerId,
            //null,
            this.connectedSpeaker.pseudonym
          );
    
          // Ajouter chaque commentaire à la liste des commentaires
          this.childCommentList.push(oneKomment);
          //this.updateCommentListSubject.next(this.kommentList);
        });
      }, error => {
        console.error("Une erreur est survenue lors de la récupération des données : ", error);
      });
    }
    




}
