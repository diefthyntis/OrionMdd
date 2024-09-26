export class Product {
    subskriptionId:string;
    topicTitle:string;
    topicSentence:string;
    topicId:string
    constructor(id:string,topicTitle:string,topicSentence:string,topicId:string) {
        this.subskriptionId= id,
        this.topicTitle=topicTitle,
        this.topicSentence=topicSentence,
        this.topicId=topicId
    }
}