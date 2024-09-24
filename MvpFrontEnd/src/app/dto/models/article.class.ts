export class Article {
    id: string;
    title: string;
    sentence: string;
    speakerId:string;
    topicId:string;
    creationDate:string;
    modificationDate:string;

  
    constructor(id: string, title: string, sentence: string,
        speakerId:string,topicId:string,creationDate:string,modificationDate:string) {
      this.id = id;
      this.title = title;
      this.sentence = sentence;
      this.speakerId=speakerId;
      this.topicId=topicId,
      this.creationDate=creationDate,
      this.modificationDate=modificationDate
    }
  }