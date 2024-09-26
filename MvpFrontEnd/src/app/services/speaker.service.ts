import { HttpClient } from "@angular/common/http";
import { GenericResponse } from "../dto/response/genericResponse.interface";
import { Observable } from "rxjs";
import { Speaker } from "../dto/models/speaker.interface";
import { Injectable } from "@angular/core";

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