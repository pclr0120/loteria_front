import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  messages = [{
    "text":"Do you like guinea pigs?",
    "self":false
  },{
    "text":"I love it <3",
    "self":true
  }]
  replyMessage = "";
  constructor() { }

  ngOnInit() {
  }

  reply(){
    this.messages.push({
      "text":this.replyMessage,
      "self":true
    })
    this.replyMessage = "";
  }

  
}
