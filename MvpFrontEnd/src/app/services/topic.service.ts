import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { TopicResponse } from '../dto/response/topicResponse.interface';
import { Topic } from '../dto/models/topic.class';



@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private pathService = 'api/topics';
  private apiUrl = 'api/topics';  // L'URL de votre API backend


  constructor(private httpClient: HttpClient) { }

// Méthode pour récupérer les topics en mode asynchrone
getTopics(): Observable<TopicResponse[]> {
  let requeteGet$=this.httpClient.get<TopicResponse[]>(this.apiUrl);
  return requeteGet$;
  
}


}
