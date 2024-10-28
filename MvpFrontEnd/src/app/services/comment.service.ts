import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

import { Komment } from "../dto/models/komment.class";
import { CommentRequest } from "../dto/request/commentRequest.interface";
import { Injectable } from "@angular/core";
import { CommentResponse } from "../dto/response/CommentResponse.interface";
import { environment } from "src/environments/environment";

@Injectable({
     providedIn: 'root'
   })
export class CommentService {
    private apiRootUrl=environment.apiUrl;


    
    constructor(private httpClient:HttpClient) {}

   public getListByArticleId(articleId:string): Observable<CommentResponse[]> {
        let apiTargetUrl=this.apiRootUrl+"comments/"+articleId+"";
        console.log("comment.service.ts apiTargetUrl="+apiTargetUrl);
        let requeteGet$=this.httpClient.get<CommentResponse[]>(apiTargetUrl);
        return requeteGet$;
   } 

   public create(commentRequest:CommentRequest): Observable<CommentResponse> {
     let apiTargetUrl=this.apiRootUrl+"comments";
     console.log("comment.service.ts.create apiTargetUrl="+apiTargetUrl);
     let commentToBeCreated$=this.httpClient.post<CommentResponse>(apiTargetUrl,commentRequest);
     return commentToBeCreated$;

   }

   
}