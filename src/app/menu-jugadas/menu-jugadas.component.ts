import { Component, OnInit,EventEmitter,  Output , Input } from '@angular/core';
import * as io from "socket.io-client";
import { SocketService } from '../servicios/socket.service';

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
  JugadaV=[false,false,false,false];
  constructor(private socketService:SocketService) {
    this.socketService.conexionEscucha( JSON.parse(localStorage.getItem('nombreSala')));

    var payload={
      autor:"Carry",
      text: "Hola",
      verificar: false
    };
  }
  


  @Output() clicked=new EventEmitter<string>();

  Verificar(jugada:any){
    //MANDA EL PARAMETRO DEL NUMERO DE JUGADA AL COMPOENETE CARTA
    this.clicked.emit(jugada);
  //  console.log("Verificar:",jugada);
  }

  getJugadaRes(data){
    console.log(data[0].valido);
      if(data[0].valido){
        if(data[0].jugada=='Chorro'){
          this.JugadaV[0]=true;
        }else if(data[0].jugada=='Centro'){
          this.JugadaV[1]=true;
        }else if(data[0].jugada=='Esquinas'){
          this.JugadaV[2]=true;
        }else if(data[0].jugada=='Llenas'){
          this.JugadaV[3]=true;
        }
      }
  }
  ngOnInit() {
    this.socketService.conexionEscucha(JSON.parse(localStorage.getItem('nombreSala')));
    this.socketService.getJugada().subscribe(response => {
      this.getJugadaRes(response);
    });
  }



}
