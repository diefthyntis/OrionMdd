import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from 'src/app/dto/models/article.class';
import { Speaker } from 'src/app/dto/models/speaker.interface';
import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {


navigateToCommentList(speakerId: string,articleId: string) {
  this.router.navigate(['/commentList', speakerId,articleId]);



}

createArticle() {
  this.router.navigate(['/newArticle']);

}


  public connectedSpeaker?:SpeakerResponse;
  

  public articleList:Article[]=[];

  constructor(private articleService: ArticleService,private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    let speakerToCome$ = this.authService.me();
    speakerToCome$.subscribe(speakerResponse => {
      console.log("article-list.component.ts.ngOnInit speakerId="+speakerResponse.id);
      this.articleList = this.articleService.getListBySpeakerId(speakerResponse.id);
      console.log(this.articleList);
    });
  }

}
