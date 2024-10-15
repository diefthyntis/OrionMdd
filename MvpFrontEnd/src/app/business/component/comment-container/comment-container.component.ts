import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChangeDetectorRef } from '@angular/core';
import { Komment } from '../../dto/model/komment.class';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.scss']
})
export class CommentContainerComponent implements OnInit {

  public speakerIdFromUrl!:string;
  public articleIdFromUrl!:string;
  public fatherCommentList: Komment[]=[];




  constructor(private route: ActivatedRoute,  private changeDetectorRef: ChangeDetectorRef) { }

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

  onNewCreatedKomment(newCreatedComment: Komment): void {
    console.log("##### CommentContainerComponent.onNewCreatedKomment newCreatedComment=",newCreatedComment);
  
    //this.fatherCommentList.push(newCreatedComment);  // Ajoute le commentaire à la liste
    this.fatherCommentList = [...this.fatherCommentList, newCreatedComment];
    console.log("##### CommentContainerComponent.onNewCreatedKomment this.fatherCommentList", this.fatherCommentList);  // Vérifie que la liste se met à jour
    this.changeDetectorRef.detectChanges();  // Forcer la détection des changements
  }
  
}
