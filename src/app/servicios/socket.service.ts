import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private url = 'http://localhost:8080';
  private socket;

  constructor() {
    this.socket = io(this.url);
    //EVENTO PARA CONECTARTE AL SOCKET
    this.socket.on('connect', function(){
      console.log("Conectado al socket!");
    });
   }
   
  Desconectar(){
    this.socket.emit('desconectar');
  }

  //UNIR USUARIOS A UNA SALA
  addUser(username, nombreSala){
    this.socket.emit('adduser', username, nombreSala);
  }

  //Obtener salas activas
  getSalas(){
    let observable = new Observable(observer => {
      this.socket.emit('Salas');
      this.socket.on('SalasInf', function(salas){
        //console.log("socket " + salas);
        observer.next(salas);
      });

    });
    return observable;
  }

  //EMITIR EL ESTADO DE LA SALA
  EmitirEstadoPartida(){
    this.socket.emit('Estado');
  }

  //OBTENER EL ESTADO DE LA SALA
  getEstadoPartida(){
    let observable = new Observable(observer => {
      this.socket.on('EstadoPartida', function(data){
        //console.log("a ver" + data);
        observer.next(data);
      });

    });
    return observable;
  }



  

}
