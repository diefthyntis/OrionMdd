import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/dto/models/article.class';
import { ArticleResponse } from 'src/app/dto/response/articleResponse.interface';
import { BlurbResponse } from 'src/app/dto/response/blurbResponse.interface';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-comment-title',
  templateUrl: './comment-title.component.html',
  styleUrls: ['./comment-title.component.scss']
})
export class CommentTitleComponent implements OnInit {

    
  @Input() speakerIdToReceive:string | undefined;
  @Input() articleIdToReceive:string | undefined;
  //public currentArticle!:ArticleResponse;
  public currentBlurb!:BlurbResponse;
  
  
  constructor(private router: Router,private articleService:ArticleService) { }

  ngOnInit(): void {
    console.log("@@@ CommentTitleComponent.ngOnInit articleIdToReceive",this.articleIdToReceive);
    const async$=this.articleService.getBlurb(this.articleIdToReceive ?? '');
    async$.subscribe(returnedBlurbByApi=> {
      this.currentBlurb=returnedBlurbByApi;
      console.log("CommentTitleComponent.ngOnInit returnedBlurbByApi",returnedBlurbByApi)
    })
  }

  createComment() {
    // Utilisation de connectedSpeakerId et currentArticle.id pour générer l'URL de redirection
    this.router.navigate(['/newComment', this.speakerIdToReceive, this.articleIdToReceive]);
  }
  

}
