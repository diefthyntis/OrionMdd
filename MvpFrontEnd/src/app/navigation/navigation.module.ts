import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectedHeaderComponent } from './component/connected-header/connected-header.component';
import { WhitePageComponent } from '../noway/component/white-page/white-page.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    ConnectedHeaderComponent,WhitePageComponent
  ],
  imports: [
    CommonModule,RouterModule
  ],
  exports: [ConnectedHeaderComponent] 
})
export class NavigationModule { }
