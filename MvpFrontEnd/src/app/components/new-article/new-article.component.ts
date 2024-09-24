import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Topic } from 'src/app/dto/models/topic.class';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';
import { TopicComponent } from '../topic/topic.component';
import { Article } from 'src/app/dto/models/article.class';
import { ArticleService } from 'src/app/services/article.service';
import { DateTool } from 'src/app/tools/date.tool';

import { Router } from '@angular/router';
import { ArticleResponse } from 'src/app/dto/response/articleResponse.interface';
import { SpeakerResponse } from 'src/app/dto/response/speakerResponse.interface';
import { TopicResponse } from 'src/app/dto/response/topicResponse.interface';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  public connectedSpeaker!:SpeakerResponse;

  public topicList:Topic[]=[];
  public bigErrorMessage?:string="";
  public selectedOption: string = "";

  public createdArticle!:ArticleResponse;

  ngOnInit(): void {
    let speakerToCome$ = this.authService.me();
    speakerToCome$.subscribe(valueReturnedByApi => {
      this.connectedSpeaker = valueReturnedByApi;
      console.log("new-article.component.ts.ngOnInit speakerId="+this.connectedSpeaker.id);
      });


    let requeteGet$ = this.topicService.getTopics();
    requeteGet$.subscribe(tableau=> {
        tableau.forEach((instance:TopicResponse)=> {
          console.log(tableau);
          const oneTopic:Topic= new Topic(instance.id,instance.title,instance.description);
          this.topicList.push(oneTopic);
        })});
    
  }

  constructor(
    private formBuilder:FormBuilder,
    private authService: AuthService,
    private topicService:TopicService,
    private articleService:ArticleService,
    private dateTool:DateTool,
    private router: Router
  ) { }
 
  
public invalidFormMessage = false;  // Variable pour afficher le message "formulaire non valide"

  public buildedForm = this.formBuilder.group({
    varTopic: [7,[Validators.required]],
    varTitle: ['Plus tard est impossible',[Validators.required]],
    varSentence:['Le prochain JB à sortir en 2025',[Validators.required]]}
  )



  
  GetSelectedOption():string {
    if (this.selectedOption=="") {
      const formValue = this.buildedForm.value;
      let temporayVarNumber = formValue.varTopic??0;
      this.selectedOption = temporayVarNumber.toString();
    }
    return this.selectedOption;
  }


  onOptionSelected(event: Event) {
    this.selectedOption = (event.target as HTMLSelectElement).value.toString();
    console.log('new-article.component.ts.onOptionSelected Selected value:', this.selectedOption);

  }


  submit() {
    console.log("submit début");
    if (this.buildedForm.invalid) {
      this.invalidFormMessage = true; // Affiche le message d'erreur
      this.bigErrorMessage="Veuillez sélectionner une option et remplir tous les champs";
      return;
    }
    else {
      const formValue = this.buildedForm.value;
      const articleRequest =  {
        sentence:formValue.varSentence as string,
        speakerid: this.connectedSpeaker.id,
        topicid:this.GetSelectedOption() as string,
        title:formValue.varTitle as string,
        creationdate:this.dateTool.getCurrentDate() as string,
        modificationdate:this.dateTool.getCurrentDate() as string
      };
      let newArticleToBeConfirmed$ = this.articleService.create(articleRequest);
      newArticleToBeConfirmed$.subscribe(
        (returnedValueByApi)  => { 
          this.createdArticle = returnedValueByApi;
          console.log('new-article.component.ts.submit', this.createdArticle);
          this.router.navigate(['/articleList']);
        },
        (obj) => {
          console.error('new-article.component.ts.submit', obj.error);
          this.bigErrorMessage = obj.error;
        }
      )
    }
  }
}
