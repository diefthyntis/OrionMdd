import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

 

  ngOnInit(): void {
  }
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

  navigateToRegister() {
    this.router.navigateByUrl('register');
  }

  navigateToTopicList() {
    this.router.navigateByUrl('topicList');
  }


}
