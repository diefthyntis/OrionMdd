import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';


import { Article } from 'src/app/dto/models/article.class';
import { Komment } from 'src/app/dto/models/komment.class';
import { ArticleResponse } from 'src/app/dto/response/articleResponse.interface';
import { KommentResponse } from 'src/app/dto/response/kommentResponse.interface';

import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { DateTool } from 'src/app/tools/date.tool';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  
  @Input() speakerIdToReceive:string | undefined;
  @Input() articleIdToReceive:string | undefined;

  public connectedSpeaker!:SpeakerResponse;
  public kommentList:Komment[]=[];
  public bigErrorMessage?:string="";
  public currentArticle!:ArticleResponse;
  public connectedSpeakerId!:string;
  public currentArticleId!:string;
  public articleTitle!:string;
  


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
          /*
          const speakerId = params.get('speakerId');
          
          const articleId = params.get('articleId');
    
          if (!speakerId) {
            throw new Error("La variable speakerId est indéfinie");
          }
    
          if (!articleId) {
            throw new Error("La variable articleId est indéfinie");
          }
    
          // Attribuer les paramètres
          this.connectedSpeakerId = speakerId ?? "";
          this.currentArticleId = articleId ?? "";
    
          
          */
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
        })
      ).subscribe(returnedCommentListByApi => {
        // Parcourir les commentaires et les ajouter à la liste
        returnedCommentListByApi.forEach((commentResponse: KommentResponse) => {
          console.log("comment-list.component.ts.ngOnInit returnedCommentListByApi=" + returnedCommentListByApi);
    
          const oneKomment = new Komment(
            commentResponse.id,
            commentResponse.sentence,
            this.dateTool.convertYyyyMmDdToDdMmYyyy(commentResponse.creationdate),
            commentResponse.modificationdate,
            commentResponse.speakerid,
            //null,
            this.connectedSpeaker.pseudonym
          );
    
          // Ajouter chaque commentaire à la liste des commentaires
          this.kommentList.push(oneKomment);
        });
      }, error => {
        console.error("Une erreur est survenue lors de la récupération des données : ", error);
      });
    }
    




}
