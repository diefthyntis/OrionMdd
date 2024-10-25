import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http';



import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { LoginComponent } from './components/login/login.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { httpInterceptorProviders } from './interceptors';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { NewArticleComponent } from './components/new-article/new-article.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { CommonModule } from '@angular/common';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';

import { WhitePageComponent } from './components/white-page/white-page.component';

import { ShapeListComponent } from './components/shape-list/shape-list.component';
import { ChangeCredentialsComponent } from './components/change-credentials/change-credentials.component';


import { ArticleContainerComponent } from './components/article-container/article-container.component';
import { TopicContainerComponent } from './components/topic-container/topic-container.component';
import { ShapeContainerComponent } from './components/shape-container/shape-container.component';
import { ConnectedHeaderComponent } from './components/connected-header/connected-header.component';
import { CommentContainerComponent } from './components/comment-container/comment-container.component';
import { CommentTitleComponent } from './components/comment-title/comment-title.component';
import { ArticleTitleComponent } from './components/article-title/article-title.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';



registerLocaleData(localeFr);

/*
const materialModule = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
]
  */

/*
Injection
*/
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AuthHeaderComponent,
    LoginComponent,
    TopicListComponent,
    ArticleListComponent,
    NewArticleComponent,
    ConnectedHeaderComponent,
    NewCommentComponent,
    CommentListComponent,
    WhitePageComponent,
    ChangeCredentialsComponent,
    ShapeListComponent,
    ArticleTitleComponent,
    ShapeContainerComponent,
    TopicContainerComponent,
    ArticleContainerComponent,
    CommentContainerComponent,
    CommentTitleComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,AppRoutingModule,ReactiveFormsModule,HttpClientModule,
    FormsModule, BrowserAnimationsModule,MatMenuModule
    /*
    ,
    ,
    BrowserAnimationsModule, 
    FlexLayoutModule,
    ,,
    ...materialModule
    */
  ],
  providers: [        
    { provide: LOCALE_ID, useValue: 'fr-FR' },httpInterceptorProviders
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
