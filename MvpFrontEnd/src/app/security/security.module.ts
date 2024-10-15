import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './interceptors';
import { RegisterComponent } from './component/register/register.component';
import { AuthHeaderComponent } from './component/auth-header/auth-header.component';
import { LoginComponent } from './component/login/login.component';
import { ConnectedHeaderComponent } from '../navigation/component/connected-header/connected-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../navigation/navigation.module';



@NgModule({
  declarations: [
    RegisterComponent,
    AuthHeaderComponent,
    LoginComponent    
    ],
  imports: [
    CommonModule,ReactiveFormsModule,NavigationModule
  ],
  providers: [        
    httpInterceptorProviders,{ provide: LOCALE_ID, useValue: 'fr-FR' }
    ]
})
export class SecurityModule { }
