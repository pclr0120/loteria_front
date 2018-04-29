import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client"
import { ThrowStmt } from '@angular/compiler';
var pru: any;
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  idSala: number;
  NomSala: string;
  TipSala: string;
  EstSala: string;
  NoJugadores: number;
  ConSala: string;

  constructor() { 
    var socket=io.connect("http://loteria-backend.herokuapp.com/");
    socket.on('prueba',(data)=>{
      console.log(data);
      this.idSala = data.prueba;
      this.NomSala = data.prueba;
      this.TipSala = data.prueba;
      this.EstSala = data.prueba;
      this.NoJugadores = data.prueba;
      this.ConSala = data.prueba;
      console.log("numero de prueba= "+ this.idSala);
    });  
  }
  ngOnInit() {
  }
}
