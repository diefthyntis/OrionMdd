import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/dto/models/article.class';
import { ArticleResponse } from 'src/app/dto/response/articleResponse.interface';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-comment-title',
  templateUrl: './comment-title.component.html',
  styleUrls: ['./comment-title.component.scss']
})
export class CommentTitleComponent implements OnInit {

    
  @Input() speakerIdToReceive:string | undefined;
  @Input() articleIdToReceive:string | undefined;
  public currentArticle!:ArticleResponse;
  
  
  constructor(private router: Router,private articleService:ArticleService) { }

  ngOnInit(): void {
    console.log("@@@ CommentTitleComponent.ngOnInit articleIdToReceive",this.articleIdToReceive);
    const asyncGetOneArticle$=this.articleService.detail(this.articleIdToReceive ?? '');
    asyncGetOneArticle$.subscribe(returnedArticleByApi=> {
      this.currentArticle=returnedArticleByApi;
      console.log("CommentTitleComponent.ngOnInit returnedArticleByApi",returnedArticleByApi)
    })
  }

  createComment() {
    // Utilisation de connectedSpeakerId et currentArticle.id pour générer l'URL de redirection
    this.router.navigate(['/newComment', this.speakerIdToReceive, this.articleIdToReceive]);
  }
  

}
