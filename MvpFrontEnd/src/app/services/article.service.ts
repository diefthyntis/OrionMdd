import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleResponse } from '../dto/response/articleResponse.interface';
import { Article } from '../dto/models/article.class';
import { DateTool } from '../tools/date.tool';
import { ArticleRequest } from '../dto/request/articleRequest.interface';




@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private rootUrl = 'api/articles';

  constructor(private httpClient: HttpClient,private dateTool:DateTool) { }

  public all(): Observable<ArticleResponse> {
    return this.httpClient.get<ArticleResponse>(this.rootUrl);
  }

  public detail(id: string): Observable<ArticleResponse> {
    let apiTargetUrl="api/article/"+id;
    console.log("article.service.ts.detail apiTargetUrl="+apiTargetUrl);
    let articleToCome$=this.httpClient.get<ArticleResponse>(apiTargetUrl);
    return articleToCome$;
  }

  public create(articleRequest: ArticleRequest): Observable<ArticleResponse> {
    let newArticleToBeConfirmed$ = this.httpClient.post<ArticleResponse>(this.rootUrl, articleRequest);
    return newArticleToBeConfirmed$;
  }

  public update(id: string, form: FormData): Observable<ArticleResponse> {
    return this.httpClient.put<ArticleResponse>(`${this.rootUrl}/${id}`, form);
  }

  public getListBySpeakerId(speakerId:string): Article[] {
        let apiUrl = `${this.rootUrl}/${speakerId}`;
        console.log("article.service.ts.getListBySpeakerId apiUrl="+apiUrl)
        
        let requeteGet$=this.httpClient.get<ArticleResponse[]>(apiUrl);
        let articleList:Article[]=[];
        requeteGet$.subscribe(tableau=> {
            tableau.forEach((instance:ArticleResponse)=> {
              console.log(tableau);
              const oneArticle:Article= new Article(
                instance.id,
                instance.title,
                instance.sentence,
                instance.speakerid,
                instance.topicid,
                instance.creationdate,
                instance.modificationdate)
                //new Date(),
                //new Date());
                articleList.push(oneArticle);
              console.log("Article.service.ts.getListBySpeakerId oneArticle"+oneArticle);
            })});
        return articleList;
    } 
}
