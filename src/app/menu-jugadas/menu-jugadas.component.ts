import { Component, OnInit,EventEmitter,  Output , Input } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-menu-jugadas',
  templateUrl: './menu-jugadas.component.html',
  styleUrls: ['./menu-jugadas.component.css']
})

export class MenuJugadasComponent implements OnInit {
  socket: SocketIOClient.Socket;
  //Jugadas 
Jugadas:any[]=["CHORRO","CENTRO","4 ESQUINAS","LLENA"];
//monedas 
  Apuesta: any[] = [20,30,10,50];
  //acumulado
  acu:any=200;
  //Verificacion de jugadas 1 para jugada verificada 0 para diponible
  JugadaV:any[]=[false,false,false,false]
  constructor() {
    var socket = io.connect('http://localhost:8080', {'forceNew':true});

    var payload={
      autor:"Carry",
      text: "Hola",
      verificar: false
    };

    socket.emit("adduser","carry","sala1");

    socket.on("jugada", function(data){
      console.log(data);
    });
  }
  


  @Output() clicked=new EventEmitter<string>();

  Verificar(jugada:any){
    //MANDA EL PARAMETRO DEL NUMERO DE JUGADA AL COMPOENETE CARTA
    this.clicked.emit(jugada);
  //  console.log("Verificar:",jugada);
  }
  ngOnInit() {
  }



}
