import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './navigation/component/landing/landing.component';
import { RegisterComponent } from './security/component/register/register.component';
import { TopicListComponent } from './business/component/topic-list/topic-list.component';
import { LoginComponent } from './security/component/login/login.component';
import { ArticleListComponent } from './business/component/article-list/article-list.component';
import { ChangeCredentialsComponent } from './business/component/change-credentials/change-credentials.component';

import { CommentListComponent } from './business/component/comment-list/comment-list.component';

import { ShapeListComponent } from './business/component/shape-list/shape-list.component';
import { WhitePageComponent } from './noway/component/white-page/white-page.component';

import { ShapeContainerComponent } from './business/component/shape-container/shape-container.component';
import { TopicComponent } from './business/component/topic/topic.component';
import { TopicContainerComponent } from './business/component/topic-container/topic-container.component';
import { ArticleContainerComponent } from './business/component/article-container/article-container.component';
import { CommentContainerComponent } from './business/component/comment-container/comment-container.component';
import { ProfileComponent } from './business/component/profile/profile.component';
import { NewArticleComponent } from './business/component/new-article/new-article.component';
import { NewCommentComponent } from './business/component/new-comment/new-comment.component';



const routes: Routes = [ 
  { path: 'register',component:RegisterComponent},
  { path: 'login',component:LoginComponent},
  { path: 'topicContainer',component:TopicContainerComponent},
  { path: 'articleContainer',component:ArticleContainerComponent},
  { path: 'shapeContainer',component:ShapeContainerComponent},
  { path: 'newArticle',component:NewArticleComponent},
  { path: 'commentContainer/:speakerId/:articleId', component: CommentContainerComponent },
  { path: 'newComment/:speakerId/:articleId', component: NewCommentComponent },
  { path: 'changeCredentials',component:ChangeCredentialsComponent},
  { path: 'welcome',component:LandingComponent},
  { path: 'whitePage',component:WhitePageComponent},
  { path: 'profile',component:ProfileComponent},
  { path: 'landing',component:LandingComponent},
  { path: '', redirectTo: 'whitePage', pathMatch: 'full' }, // Redirection vers la page de bienvenue
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 