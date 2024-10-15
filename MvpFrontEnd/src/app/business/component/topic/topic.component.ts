import { Component, Input, OnInit } from '@angular/core';
import { TopicResponse } from 'src/app/business/dto/response/topicResponse.interface';



@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  @Input() inputTopicResponse!:TopicResponse;


  constructor() { }

  ngOnInit(): void {
  }

}
