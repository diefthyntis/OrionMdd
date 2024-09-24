import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Komment } from "../dto/models/komment.class";
import { CommentRequest } from "../dto/request/commentRequest.interface";
import { Injectable } from "@angular/core";
import { KommentResponse } from "../dto/response/kommentResponse.interface";

@Injectable({
     providedIn: 'root'
   })
export class CommentService {
    private apiRootUrl="api/";

    constructor(private httpClient:HttpClient) {}

   public getListByArticleId(articleId:string): Observable<KommentResponse[]> {
        let apiTargetUrl=this.apiRootUrl+"comments/"+articleId+"";
        console.log("comment.service.ts apiTargetUrl="+apiTargetUrl);
        let requeteGet$=this.httpClient.get<KommentResponse[]>(apiTargetUrl);
        return requeteGet$;
   } 

   public create(commentRequest:CommentRequest): Observable<KommentResponse> {
     let apiTargetUrl=this.apiRootUrl+"comments";
     console.log("comment.service.ts.create apiTargetUrl="+apiTargetUrl);
     let commentToBeCreated$=this.httpClient.post<KommentResponse>(apiTargetUrl,commentRequest);
     return commentToBeCreated$;

   }

   
}