import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { LoginComponent } from './components/login/login.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ChangeCredentialsComponent } from './components/change-credentials/change-credentials.component';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { ShapeListComponent } from './components/shape-list/shape-list.component';
import { WhitePageComponent } from './components/white-page/white-page.component';

import { ShapeContainerComponent } from './components/shape-container/shape-container.component';
import { TopicContainerComponent } from './components/topic-container/topic-container.component';
import { ArticleContainerComponent } from './components/article-container/article-container.component';
import { CommentContainerComponent } from './components/comment-container/comment-container.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardService } from './services/guard.service';



const routes: Routes = [
  { path: '',component:LandingComponent},
  { path: 'register',component:RegisterComponent},
  { path: 'login',component:LoginComponent},
  { path: 'topicContainer',component:TopicContainerComponent, canActivate: [GuardService]},
  { path: 'articleContainer',component:ArticleContainerComponent, canActivate: [GuardService]},
  { path: 'shapeContainer',component:ShapeContainerComponent, canActivate: [GuardService]},
  { path: 'newArticle',component:NewArticleComponent, canActivate: [GuardService]},
  { path: 'commentContainer/:speakerId/:articleId', component: CommentContainerComponent, canActivate: [GuardService] },
  { path: 'newComment/:speakerId/:articleId', component: NewCommentComponent, canActivate: [GuardService] },
  { path: 'changeCredentials',component:ChangeCredentialsComponent, canActivate: [GuardService]},
  { path: 'welcome',component:LandingComponent, canActivate: [GuardService]},
  { path: 'whitePage',component:WhitePageComponent, canActivate: [GuardService]},
  { path: 'profile',component:ProfileComponent, canActivate: [GuardService]},
  { path: 'landing',component:LandingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 



