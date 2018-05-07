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
  /*EmitirEstadoPartida(){
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
  }*/

  //Emitir evento que comienza la partida
  iniciarPartida(){
    this.socket.emit('Estado');
  }

  getEstado(){
    let observable = new Observable(observer => {
      //this.socket.emit('Salas');
      this.socket.on('EstadoPartida', function(number){
        //console.log("socket " + salas);
        observer.next(number);
      });

    });
    return observable;
  }

  getNumerosBaraja(){
    let observable = new Observable(observer => {
      //this.socket.emit('Salas');
      this.socket.on('numerosBaraja', function(number){
        //console.log("socket " + salas);
        observer.next(number);
      });

    });
    return observable;
  }

  getJugada(){
    let observable = new Observable(observer => {
      //this.socket.emit('Salas');
      this.socket.on('jugada', function(number){
        //console.log("socket " + salas);
        observer.next(number);
      });

    });
    return observable;
  }

  conexionEscucha(nombreSala){
    this.socket.emit('ConexionEscuchar',nombreSala);
  }

  //FUNCION PARA VERIFICAR CHORRO
  verificarChorro(payload, arreglo){
    this.socket.emit('verificarChorro',payload,arreglo);
  }

  //FUNCION PARA VERIFICAR CENTRO
  verificarCentro(payload, arreglo){
    this.socket.emit('verificarCentro',payload,arreglo);
  }

  //FUNCION PARA VERIFICAR ESQUINAS
  verificarEsquinas(payload, arreglo){
    this.socket.emit('verificarEsquinas',payload,arreglo);
  }

  //FUNCION PARA VERIFICAR LLENAS
  verificarLlenas(payload, arreglo){
    this.socket.emit('verificarLlenas',payload,arreglo);
  }
  

}
