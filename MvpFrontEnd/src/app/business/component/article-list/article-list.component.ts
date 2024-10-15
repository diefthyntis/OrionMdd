import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, Observable } from 'rxjs';

import { Article } from 'src/app/business/dto/model/article.class';
import { Speaker } from 'src/app/business/dto/model/speaker.interface';
import { ArticleResponse } from 'src/app/business/dto/response/articleResponse.interface';
import { SpeakerResponse } from 'src/app/business/dto/response/speakerResponse.interface';
import { ArticleService } from '../../service/article.service';
import { AuthService } from 'src/app/security/service/auth.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {


navigateToCommentList(speakerId: string,articleId: string) {
  this.router.navigate(['/commentContainer', speakerId,articleId]);



}



  public connectedSpeaker!:SpeakerResponse;
  

  public articleList:Article[]=[];

  
  public asyncGetArticleList$: Observable<ArticleResponse>[] = [];

  constructor(private articleService: ArticleService,private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    let speakerToCome$ = this.authService.me();
    //let asyncGetListArticle = ;
    speakerToCome$.pipe(
      concatMap((speakerResponseReturnedByApi:SpeakerResponse) => {
        this.connectedSpeaker = speakerResponseReturnedByApi;
        return this.articleService.getListBySpeakerId(speakerResponseReturnedByApi.id);
      })
    ).subscribe({
        next: (tableau: ArticleResponse[])=> {
          tableau.forEach((instance:ArticleResponse)=> {
            console.log(tableau);
            const oneArticle:Article= new Article(
            instance.id,
            instance.title,
            instance.sentence,
            instance.speakerid,
            instance.topicid,
            instance.creationdate,
            instance.modificationdate,
            this.connectedSpeaker.pseudonym);
            this.articleList.push(oneArticle);
            console.log("ArticleListComponent oneArticle",oneArticle);
            });
          },
          error: (err) => {
            console.error("ArticleListComponent.ngOnInit Erreur lors de la récupération des articles", err);
          },
          complete: () => {
            console.log("ArticleListComponent.ngOnInit  Récupération des articles terminée");
          }
        });
      }
}

/*
        

        console.log("article-list.component.ts.ngOnInit speakerId="+speakerResponse.id);
        return speakerResponse;
      }
      ,
        this.articleList = ;
        console.log(this.articleList);
        }),


*/