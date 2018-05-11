import { Component, OnInit, Input } from '@angular/core';
import * as io from "socket.io-client";
import { isEmpty } from 'rxjs/operator/isEmpty';
import { forEach } from '@angular/router/src/utils/collection';
import { ajaxGetJSON } from 'rxjs/observable/dom/AjaxObservable';
import { SocketService } from '../servicios/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [SocketService]
})
export class ChatComponent implements OnInit {

  mensaje = JSON;
  str: string;
  replyMessage = "";
  time = new Date();

  //arreglo de mensajes de ejemplo para mostrar 
  messages = [{
    text: "Chat",
    self: false
  }]

  //arreglo de notificaciones de ejemplo para mostrar 
  notificaciones = [{//Holi//Holi
    text: "Notificaciones",
    self: false
  }]

  socket: SocketIOClient.Socket;
  constructor(private socketService: SocketService) {
    var payload = {
      autor: JSON.parse(localStorage.getItem('identity')),
      text: "Hola soy texto",
      verificar: false
    };
  }

  cacharMensajes(data) {
    if(data.autor == JSON.parse(localStorage.getItem('identity'))){
      this.str = data.autor + ": " + data.text;
      this.messages.push({
        text: this.str,
        self: true
      })
    }else{ 
      this.str = data.autor + ": " + data.text;
      this.messages.push({
        text: this.str,
        self: false
      })
    }
  }

  cacharJugadas(data) {
    console.log(data);
    if (data[0].valido) {
      this.str = "Loteria: El jugador " + data[0].userName + " hizo " + data[0].jugada;
      this.notificaciones.push({ //Holi
        text: this.str,
        self: false
      })
    }
  }

  cacharEstado(data) {
    if(data=="Iniciando Partida"){
      this.notificaciones = [{//Holi//Holi
        text: "Notificaciones",
        self: false
      }]
      this.messages = [{ //Holi
        text: "Bienvenido",
        self: false
      }];
    }
    this.str = "Loteria: "+ data;
      this.notificaciones.push({ //Holi
        text: this.str,
        self: false
      })
  }

  ngOnInit() {
    this.socketService.conexionEscucha(JSON.parse(localStorage.getItem('nombreSala')));
    this.socketService.cacharMensajes().subscribe(response => {
      this.cacharMensajes(response);
    });
    this.socketService.getJugada().subscribe(response => {
      this.cacharJugadas(response);
    });

    this.socketService.getEstado().subscribe(response => {
      this.cacharEstado(response);
    });

  }

  render(data) {
    document.getElementById('messages').innerHTML = document.getElementById('messages').innerHTML + '<strong>' + data.autor + ':</strong> <em>' + data.text + '</em><br>'
  }

  //funcion que manda los valores al arreglo y al back

  reply() {

    //validacion rapida ara evitar mensajes sin contenido
    if (this.replyMessage == "") {

    } else {
      //variable para imprimir hora actual
      this.time = new Date();

      //creacion del archivo Json "mensaje" 
      var mensaje = {
        autor: JSON.parse(localStorage.getItem('identity')),
        text: this.replyMessage,
        self: false
      }
      this.socketService.NewMessage(mensaje);

      //limpieza del texbox
      this.replyMessage = "";
    }
  }
}

