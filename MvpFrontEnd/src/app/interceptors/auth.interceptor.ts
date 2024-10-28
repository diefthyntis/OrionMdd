import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let bus:HttpHeaders;
    
    if (req.url.includes('login')) {
        console.log("auth.interceptor.ts.intercept route login");
        bus = new HttpHeaders().
        append('X-Copyright',`diefthyntis@gmail.com`).
        append('X-route','login-route');
        console.log("auth.interceptor.ts.intercept ajout de X-route LOGIN ok");
      }
    else
    {
        console.log("auth.interceptor.ts.intercept route non-login");
        bus = new HttpHeaders().
        append('X-Copyright',`diefthyntis@gmail.com`).
        append('Authorization', `Bearer ${this.authService.getToken()}`).
        append('X-route','non-login-route');
        console.log("auth.interceptor.ts.intercept ajout de X-route NON-LOGIN ok");
        let actualToken=`Bearer ${this.authService.getToken()}`;
        console.log("auth.interceptor.ts.intercept token="+actualToken);
    }
 

    const modifiedReq = req.clone({ headers: bus })
    
    let tmp=modifiedReq.headers.getAll("Authorization");
    console.log(tmp);
   
    
    console.log("AuthInterceptor.intercept terminée");
    return next.handle(modifiedReq).pipe(
      catchError((error) => {
        console.log("AuthInterceptor.intercept Erreur détectée :", error.error);
        console.log("AuthInterceptor.intercept Erreur détectée :", error.message);
        /*
        console.log("AuthInterceptor.intercept Erreur détectée :", error.status);
        console.log("AuthInterceptor.intercept Erreur détectée :", error.statusText);
        if (error.status === 403 && error.error?.includes('CORS')) {
          console.log("AuthInterceptor.intercept Erreur CORS détectée :", error.message);
        } else {
          console.log("AuthInterceptor.intercept Erreur HTTP détectée :", error.message);
        }
          */
        return throwError(() => error);
      })
    );

  }
}
