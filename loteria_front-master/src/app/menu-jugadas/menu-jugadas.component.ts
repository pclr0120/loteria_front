import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as io from "socket.io-client";
import { SocketService } from '../servicios/socket.service';
import { GanadoresService } from '../servicios/ganadores.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-menu-jugadas',
  templateUrl: './menu-jugadas.component.html',
  styleUrls: ['./menu-jugadas.component.css']
})

export class MenuJugadasComponent implements OnInit {
  socket: SocketIOClient.Socket;
  //Jugadas 
  Jugadas: any[] = ["Chorro", "Centro", "Cuatro Esquinas", "Llena"];
  jugada: any;
  carta: any;
  usuario: any;
  partida: any;
  //monedas 
  Apuesta: any[] = [20, 30, 10, 50];
  monto: any;
  //acumulado
  acu: any = 200;
  //Verificacion de jugadas 1 para jugada verificada 0 para diponible
  JugadaV = [false, false, false, false];
  constructor(private router: Router, private socketService: SocketService,
    private ganadoresService: GanadoresService) {
    this.socketService.conexionEscucha(JSON.parse(localStorage.getItem('nombreSala')));

    var payload = {
      autor: "Carry",
      text: "Hola",
      verificar: false
    };
  }



  @Output() clicked = new EventEmitter<string>();

  Verificar(jugada: any) {
    //MANDA EL PARAMETRO DEL NUMERO DE JUGADA AL COMPOENETE CARTA
    this.clicked.emit(jugada);
    //  console.log("Verificar:",jugada);
    //guardando en tabla ganadores
    
  }

  getJugadaRes(data) {
    this.carta = JSON.parse(localStorage.getItem('idCarta'));
    this.usuario = JSON.parse(localStorage.getItem('idUsuario'));
    this.partida = JSON.parse(localStorage.getItem('idpartida'));
    console.log(data[0].valido);
    if (data[0].valido) {
      if (data[0].jugada == 'Chorro') {
        this.JugadaV[0] = true;
        this.jugada = 1;
        this.monto = 20;
        this.jugadaGuardada();
      } else if (data[0].jugada == 'Centro') {
        this.JugadaV[1] = true;
        this.jugada = 2;
        this.monto = 30;
        this.jugadaGuardada();
      } else if (data[0].jugada == 'Esquinas') {
        this.JugadaV[2] = true;
        this.jugada = 3;
        this.monto = 10;
        this.jugadaGuardada();
      } else if (data[0].jugada == 'Llenas') {
        this.JugadaV[3] = true;
        this.jugada = 4;
        this.monto = 50;
        this.jugadaGuardada();
      }
    }
  }

  jugadaGuardada(){
    this.usuario = this.guardarJugada();
    this.ganadoresService.postGanadores(this.usuario)
      .subscribe(newpres => { })
    console.log(this.usuario)
  }
  guardarJugada() {
    const guardarjugada = {
      idUsuario: this.usuario,
      idPartida: this.partida,
      idPremio: this.jugada,
      idCarta: this.carta,
      idBarja: 2,
      monto: this.monto
    }
    return guardarjugada;
  }
  cacharEstado(res) {
    if (res == "Iniciando Partida") {
      this.JugadaV = [false, false, false, false];
    }
  }

  ngOnInit() {
    this.socketService.conexionEscucha(JSON.parse(localStorage.getItem('nombreSala')));
    this.socketService.getJugada().subscribe(response => {
      this.getJugadaRes(response);
    });

    this.socketService.getEstado().subscribe(response => {
      this.cacharEstado(response);
      console.log(response);
    });

  }

  abandonar() {
    this.socketService.Desconectar();
    console.log("ID CARTA: " + JSON.parse(localStorage.getItem('idCarta')));
    this.socketService.EliminarCartaSelect(JSON.parse(localStorage.getItem('idCarta')) - 1, JSON.parse(localStorage.getItem('nombreSala')));
    localStorage.removeItem('nombreSala');
    this.router.navigate(['/lobby']);
  }



}
