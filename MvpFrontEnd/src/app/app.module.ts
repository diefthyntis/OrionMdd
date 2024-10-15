import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http';



import { RegisterComponent } from './security/component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHeaderComponent } from './security/component/auth-header/auth-header.component';

import { TopicComponent } from './business/component/topic/topic.component';
import { LoginComponent } from './security/component/login/login.component';
import { TopicListComponent } from './business/component/topic-list/topic-list.component';

import { ArticleListComponent } from './business/component/article-list/article-list.component';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { CommonModule } from '@angular/common';

import { CommentListComponent } from './business/component/comment-list/comment-list.component';

import { WhitePageComponent } from './noway/component/white-page/white-page.component';

import { ShapeListComponent } from './business/component/shape-list/shape-list.component';
import { ChangeCredentialsComponent } from './business/component/change-credentials/change-credentials.component';


import { ArticleContainerComponent } from './business/component/article-container/article-container.component';
import { TopicContainerComponent } from './business/component/topic-container/topic-container.component';
import { ShapeContainerComponent } from './business/component/shape-container/shape-container.component';
import { ConnectedHeaderComponent } from './navigation/component/connected-header/connected-header.component';
import { CommentContainerComponent } from './business/component/comment-container/comment-container.component';
import { CommentTitleComponent } from './business/component/comment-title/comment-title.component';
import { ArticleTitleComponent } from './business/component/article-title/article-title.component';

import { ProfileComponent } from './business/component/profile/profile.component';
import { NewArticleComponent } from './business/component/new-article/new-article.component';
import { NewCommentComponent } from './business/component/new-comment/new-comment.component';
import { SecurityModule } from './security/security.module';
import { NowayModule } from './noway/noway.module';
import { NavigationError } from '@angular/router';
import { BusinessModule } from './business/business.module';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './navigation/navigation.module';





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
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BusinessModule,
    NavigationModule,
    NowayModule,
    SecurityModule,
    SharedModule
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
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
