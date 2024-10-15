import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { GenericResponse } from "src/app/security/dto/response/genericResponse.interface";

@Injectable({
    providedIn: 'root'
  })
export class SpeakerService {

    constructor(private httpClient:HttpClient) {}

    public updateSpeaker(form: FormData): Observable<GenericResponse>{
        let apiTargetUrl="api/updateSpeaker";
        let asyncUpdate$=this.httpClient.put<GenericResponse>(apiTargetUrl,form);
        return asyncUpdate$;
    }
}