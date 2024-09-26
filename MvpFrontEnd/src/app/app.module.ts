import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http';



import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';

import { TopicComponent } from './components/topic/topic.component';
import { LoginComponent } from './components/login/login.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { httpInterceptorProviders } from './interceptors';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { ConnectedHeaderComponent } from './components/connected-header/connected-header.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { CommonModule } from '@angular/common';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SpeakerDetailComponent } from './components/speaker-detail/speaker-detail.component';
import { WhitePageComponent } from './components/white-page/white-page.component';

import { ShapeListComponent } from './components/shape-list/shape-list.component';
import { ChangeCredentialsComponent } from './components/witness-page/change-credentials.component';



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
    TopicComponent,
    LoginComponent,
    TopicListComponent,
    ArticleListComponent,
    NewArticleComponent,
    ConnectedHeaderComponent,
    NewCommentComponent,
    CommentListComponent,
    ProfileComponent,
    SpeakerDetailComponent,
    WhitePageComponent,
    ChangeCredentialsComponent,
    ShapeListComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,ReactiveFormsModule,HttpClientModule
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
