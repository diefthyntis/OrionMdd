import { Article } from "./article.class";

export class Komment {
    id: string;
    sentence:string;
    //article: Article;
    speakerId:string;
    creationDate:string;
    modificationDate:string;
    pseudonymSpeaker:string

  
    constructor(id: string, 
        sentence:string,
        creationDate:string,
        modificationDate:string,
        speakerId:string,
        //article: Article, 
        pseudonymSpeaker:string
         ) {
      this.id = id;
      this.sentence=sentence;
      this.creationDate=creationDate,
      this.modificationDate=modificationDate
      this.speakerId=speakerId;
      //this.article = article;
      this.pseudonymSpeaker=pseudonymSpeaker
    }
  }