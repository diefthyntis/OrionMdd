export class Topic {
    id: string;
    title: string;
    description: string;
    subskriptionActivated!:boolean;
    informationMessage!:string;
  
    constructor(id: string, title: string, description: string) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.subskriptionActivated=false;
      this.informationMessage="";
      
    }
  }