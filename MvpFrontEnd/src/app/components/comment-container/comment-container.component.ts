import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.scss']
})
export class CommentContainerComponent implements OnInit {

  public speakerIdFromUrl!:string;
  public articleIdFromUrl!:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.speakerIdFromUrl = params.get('speakerId') ?? '';
        this.articleIdFromUrl = params.get('articleId') ?? '';
        if (!this.speakerIdFromUrl) {
          throw new Error("La variable speakerId est indéfinie");
        }
        if (!this.articleIdFromUrl) {
          throw new Error("La variable articleId est indéfinie");
        }
        console.log("##### CommentContainerComponent.ngOnInit speakerIdFromUrl=" + this.speakerIdFromUrl);
        console.log("##### CommentContainerComponent.ngOnInit articleIdFromUrl=" + this.articleIdFromUrl);
     
      }
    );
  }
}
