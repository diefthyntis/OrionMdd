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



const routes: Routes = [
  { path: '',component:LandingComponent},
  { path: 'register',component:RegisterComponent},
  { path: 'topicList',component:TopicListComponent},
  { path: 'articleList',component:ArticleListComponent},
  { path: 'login',component:LoginComponent},
  { path: 'newArticle',component:NewArticleComponent},
  { path: 'commentList/:speakerId/:articleId', component: CommentListComponent },
  { path: 'newComment/:speakerId/:articleId', component: NewCommentComponent },
  { path: 'shapeList',component:ShapeListComponent},
  { path: 'changeCredentials',component:ChangeCredentialsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 