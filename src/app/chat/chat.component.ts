import { Component, OnInit, Input } from '@angular/core';
import * as io from "socket.io-client";
import { isEmpty } from 'rxjs/operator/isEmpty';
var socket = io.connect('http://localhost:8080', {'forceNew':true});
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje=JSON;
  replyMessage = "";
  time = new Date();
  //arreglo de mensajes de ejmplo para mostrar 
  messages = [{
    "text":"Do you like guinea pigs?",
    "self":false
  },{
    "text":"I love it <3",
    "self":true
  }]
  
  constructor() { }

  ngOnInit() {
  }

  render(data){
    document.getElementById('messages').innerHTML  = document.getElementById('messages').innerHTML + '<strong>'+data.autor + ':</strong> <em>' + data.text + '</em><br>'
  }

  //funcion que manda los valores al arreglo y al back
  reply(){
  //validacion rapida ara evitar mensajes sin contenido
    if (this.replyMessage == ""){
      
    }else{
  //variable para imprimir hora actual
    this.time = new Date();

  //creacion del archivo Json "mensaje" 
    var mensaje={
      autor:document.getElementById('username'),
      text:this.replyMessage
    } 
    socket.emit('new-message', mensaje);
    console.log(mensaje);

  //agrega el mensaje al arreglo de arriva para mostrarlo en pantalla
    this.messages.push({
      "text":this.replyMessage+"_"+this.time.getHours()+":"+this.time.getMinutes(),
      "self":true
    })
  //limpieza del texbox
    this.replyMessage = "";
  }
  }
}
socket.on('connectToRoom',function(data) {
  console.log(data);
});
