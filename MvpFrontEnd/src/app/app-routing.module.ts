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
import { TopicComponent } from './components/topic/topic.component';
import { TopicContainerComponent } from './components/topic-container/topic-container.component';
import { ArticleContainerComponent } from './components/article-container/article-container.component';
import { CommentContainerComponent } from './components/comment-container/comment-container.component';



const routes: Routes = [
  { path: '',component:LandingComponent},
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
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 