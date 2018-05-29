import { Component, OnInit, Input } from '@angular/core';
import * as io from "socket.io-client";
import { isEmpty } from 'rxjs/operator/isEmpty';
import { forEach } from '@angular/router/src/utils/collection';
import { ajaxGetJSON } from 'rxjs/observable/dom/AjaxObservable';
import { SocketService } from '../servicios/socket.service';
import { PartidaService } from '../servicios/partida.service';
import { SalasService } from '../servicios/salas.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [SocketService]
})
export class ChatComponent implements OnInit {
  partida: any;
  id: any;
  Salas_BD: any;


  mensaje = JSON;
  str: string;
  replyMessage = "";
  time = new Date();
  NombreSala = "";

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
  constructor(private socketService: SocketService, private partidaService: PartidaService, private salasService: SalasService) {
    var payload = {
      autor: JSON.parse(localStorage.getItem('identity')),
      text: "Hola soy texto",
      verificar: false
    };
  }

  cacharMensajes(data) {
    if (data.autor == JSON.parse(localStorage.getItem('identity'))) {
      this.str = data.autor + ": " + data.text;
      this.messages.push({
        text: this.str,
        self: true
      })
    } else {
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
    console.log(data)
    if (data == "Listo para Jugar"){
       //IR GUARDANDO EN LA BASE DE DATOS CUANDO INICIA CADA PARTIDA
       this.partidaService.getObtenerNumPartida().subscribe(
        response => {
          this.id = response[0].idPartida;
          localStorage.setItem('idpartida',JSON.stringify(this.id));          
          this.partida = this.savepartida();
          this.partidaService.postNuevaPartida(this.partida).subscribe(newpres => {
          })
        })
      
    }
    if (data == "Iniciando Partida") {
     
      this.notificaciones = [{//Holi//Holi
        text: "Notificaciones",
        self: false
      }]
      this.messages = [{ //Holi
        text: "Bienvenido",
        self: false
      }];
      data = "Reiniciando Partida";

    }
    
    this.str = "Loteria: " + data;
    this.notificaciones.push({ //Holi
      text: this.str,
      self: false
    })
  }

  cacharConteo(data) {
    this.str = data;
    this.notificaciones.push({
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
    this.socketService.getConteo().subscribe(response => {
      this.cacharConteo(response);
    });

    //Nombre de la sala
    this.NombreSala = JSON.parse(localStorage.getItem('nombreSala'))
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

  //NUEVO!!!!!!



  savepartida() {
    const savepartida = {
      idpartida: Number(this.id) + Number(1),
      idSala: JSON.parse(localStorage.getItem('idSala')),
      numJugadores: 1,
      costoCarta: 1,
      horaInicio: "2018-05-15",
      horaFin: "2018-05-15",
      estado: 'A'

    };
    return savepartida;
  }



}

