import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connected-header',
  templateUrl: './connected-header.component.html',
  styleUrls: ['./connected-header.component.scss']
})
export class ConnectedHeaderComponent implements OnInit {

 /// public bigErrorMessage=""; 

  /*
navigateToArticleList() {
  this.router.navigateByUrl('articleList');

}
navigateToTopicList() {
  this.router.navigateByUrl('topicList');

}
  */

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
