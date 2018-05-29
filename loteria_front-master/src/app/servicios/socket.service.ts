import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  //private url = 'http://localhost:8080';
  private url = 'http://ec2-18-217-208-255.us-east-2.compute.amazonaws.com:4000';

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

  NewMessage(mensaje){
    this.socket.emit('new-message',mensaje);
  }

  AgregarCartaSelect(idCarta,nombreSala){
    this.socket.emit('AgregarCartaSelect',idCarta,nombreSala);
  }

  EliminarCartaSelect(idCarta,nombreSala){
    this.socket.emit('EliminarCartaSelect',idCarta,nombreSala);
  }

  //UNIR USUARIOS A UNA SALA
  addUser(username, nombreSala){
    this.socket.emit('adduser', username, nombreSala);
  }

  getCartasSelect(nombreSala){
    let observable = new Observable(observer => {
      this.socket.emit('RetornarCartasSelect',nombreSala);
      console.log("Entroooo");
      this.socket.on('CartasSeleccionadas', function(data){
        //console.log("socket " + salas);
        console.log("Entroooo");
        console.log(data);
        observer.next(data);
      });
    });
    return observable;
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

  cacharMensajes(){
    let observable = new Observable(observer => {
     
      this.socket.on('messages', function(data){
        //console.log("socket " + salas);
        observer.next(data);
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
  getConteo(){
    let observable = new Observable(observer => {
      //this.socket.emit('Salas');
      this.socket.on('Conteo', function(number){
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
