import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './component/topic/topic.component';
import { TopicListComponent } from './component/topic-list/topic-list.component';
import { ArticleListComponent } from './component/article-list/article-list.component';
import { NewArticleComponent } from './component/new-article/new-article.component';
import { NewCommentComponent } from './component/new-comment/new-comment.component';
import { CommentListComponent } from './component/comment-list/comment-list.component';
import { ChangeCredentialsComponent } from './component/change-credentials/change-credentials.component';
import { ShapeListComponent } from './component/shape-list/shape-list.component';
import { ArticleTitleComponent } from './component/article-title/article-title.component';
import { ShapeContainerComponent } from './component/shape-container/shape-container.component';
import { TopicContainerComponent } from './component/topic-container/topic-container.component';
import { ArticleContainerComponent } from './component/article-container/article-container.component';
import { CommentContainerComponent } from './component/comment-container/comment-container.component';
import { CommentTitleComponent } from './component/comment-title/comment-title.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ConnectedHeaderComponent } from '../navigation/component/connected-header/connected-header.component';
import { NavigationModule } from '../navigation/navigation.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TopicComponent,
    TopicListComponent,
    ArticleListComponent,
    NewArticleComponent,
    NewCommentComponent,
    CommentListComponent,
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
    CommonModule,NavigationModule,ReactiveFormsModule,RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class BusinessModule { }
