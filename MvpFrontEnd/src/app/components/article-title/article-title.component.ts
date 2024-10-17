import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-title',
  templateUrl: './article-title.component.html',
  styleUrls: ['./article-title.component.scss']
})
export class ArticleTitleComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  
  createArticle() {
    this.router.navigate(['/newArticle']);
  
  }

  sortByDate() {
    throw new Error('Method not implemented.');
    }
  

}
