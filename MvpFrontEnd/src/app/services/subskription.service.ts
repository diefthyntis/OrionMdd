import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DateTool } from '../tools/date.tool';
import { SubskriptionResponse } from '../dto/response/subskriptionResponse.interface';
import { SubskriptionRequest } from '../dto/request/subskriptionRequest.interface';
import { AuthSuccess } from '../dto/response/authSuccess.interface';
import { GenericResponse } from '../dto/response/genericResponse.interface';
import { ProductResponse } from '../dto/response/productResponse.interface';





@Injectable({
  providedIn: 'root'
})
export class SubskriptionService {

  private rootUrl = 'api/subscription';

  constructor(private httpClient: HttpClient,private dateTool:DateTool) { }

  public all(): Observable<SubskriptionResponse> {
    return this.httpClient.get<SubskriptionResponse>(this.rootUrl);
  }

  public detail(id: string): Observable<SubskriptionResponse> {
    let apiTargetUrl="api/subscription/"+id;
    console.log("subskription.service.ts.detail apiTargetUrl="+apiTargetUrl);
    let subskriptionToCome$=this.httpClient.get<SubskriptionResponse>(apiTargetUrl);
    return subskriptionToCome$;
  }

  public create(subskriptionRequest: SubskriptionRequest): Observable<GenericResponse> {
    let apiTargetUrl="api/newSubscription"
    console.log("subskription.service.ts.create apiTargetUrl="+apiTargetUrl)
    let newsubskriptionToBeConfirmed$ = this.httpClient.post<GenericResponse>(apiTargetUrl, subskriptionRequest);
    return newsubskriptionToBeConfirmed$;
  }

  public update(id: string, form: FormData): Observable<SubskriptionResponse> {
    return this.httpClient.put<SubskriptionResponse>(`${this.rootUrl}/${id}`, form);
  }

  public getListBySpeakerId(speakerId:string): Observable<SubskriptionResponse[]> {
        let apiTargetUrl = "api/subscriptionListBySpeakerId"
        console.log("subskription.service.ts.getListBySpeakerId apiUrl="+apiTargetUrl)
        let requeteGet$=this.httpClient.get<SubskriptionResponse[]>(apiTargetUrl);
        return requeteGet$;
  }

  public getListProduct(speakerId:string): Observable<ProductResponse[]> {
    let apiTargetUrl = "api/producList/"+speakerId;
    console.log("subskription.service.ts.getListProduct apiUrl="+apiTargetUrl)
    let requeteGet$=this.httpClient.get<ProductResponse[]>(apiTargetUrl);
    return requeteGet$;
}

}
