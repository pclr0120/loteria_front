import { Component, OnInit, Input } from '@angular/core';
import * as io from "socket.io-client";
import { isEmpty } from 'rxjs/operator/isEmpty';
import { forEach } from '@angular/router/src/utils/collection';
import { ajaxGetJSON } from 'rxjs/observable/dom/AjaxObservable';
import { SocketService } from '../servicios/socket.service';
var socket = io.connect('http://localhost:8080', {'forceNew':true});

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [SocketService]
})
export class ChatComponent implements OnInit {

  mensaje=JSON;
  str:string;
  replyMessage = "";
  time = new Date(); 

  //arreglo de mensajes de ejemplo para mostrar 
  messages = [{
    text:"Do you like guinea pigs?",
    self:false
  },{
    text:"I love it <3",
    self:true  
  }]

  socket: SocketIOClient.Socket;
  constructor(private socketService:SocketService) {
    var socket = io.connect('http://localhost:8080', {'forceNew':true});
    var payload={
      autor: "Saul",
      text: "Hola soy texto",
      verificar: false
    };
   }

   cacharMensajes(data){
     console.log(data);
    this.str=data.autor + ": "+data.text;
    this.messages.push({
      text:this.str,
      self:false
    })
   }

   cacharJugadas(data){
    console.log(data);
      if(data[0].valido){
        this.str = "Loteria: El jugador "+data[0].userName + " hizo "+data[0].jugada;
        this.messages.push({
          text:this.str,
          self:false
        })
      }
   }

  ngOnInit() {
    this.socketService.conexionEscucha(JSON.parse(localStorage.getItem('nombreSala')));
    this.socketService.cacharMensajes().subscribe(response => {
      this.cacharMensajes(response);
    });
    this.socketService.getJugada().subscribe(response=>{
      this.cacharJugadas(response);
    });
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
      text:this.replyMessage,
      self:false
    } 
    socket.emit('new-message', mensaje);
    console.log(mensaje);

  //agrega el mensaje al arreglo de arriva para mostrarlo en pantalla
    this.messages.push({
      text:this.replyMessage+"_"+this.time.getHours()+":"+this.time.getMinutes(),
      self:true
    })
  //limpieza del texbox
    this.replyMessage = "";
    }
  }
}

