import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as io from "socket.io-client";
import { isEmpty } from 'rxjs/operator/isEmpty';
import { forEach } from '@angular/router/src/utils/collection';
import { ajaxGetJSON } from 'rxjs/observable/dom/AjaxObservable';
import { SocketService } from '../servicios/socket.service';
//var socket = io.connect('http://localhost:8080', { 'forceNew': true });
var socket = io.connect('http://ec2-18-217-208-255.us-east-2.compute.amazonaws.com:4000', { 'forceNew': true });

import { CartaService } from '../servicios/carta.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
  providers: [SocketService]
})
export class CartaComponent implements OnInit {
  chorro: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arreglo = new Array();
  algo = "";
  NumCarta = 1;
  Carta: any[] = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  Selec: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cartasAverificar: any[] = [0, 0, 0, 0];

  public ArrgeloCarta: any[];

  payload = {
    autor: JSON.parse(localStorage.getItem("identity")),
    text: "",
    verificar: false
  };

  constructor(private socketService: SocketService,
    private cartaServicio: CartaService) {
    //socket.emit('',payload);
    this.socketService.conexionEscucha(JSON.parse(localStorage.getItem('nombreSala')));
  }

  cacharEstado(res) {
    if (res == "Iniciando Partida") {
      this.chorro = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.arreglo = new Array();
      this.algo = "";
      this.NumCarta = 1;
      //this.Carta  = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      this.Selec = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.cartasAverificar = [0, 0, 0, 0];

      this.ArrgeloCarta = [];

      this.payload = {
        autor: JSON.parse(localStorage.getItem("identity")),
        text: "",
        verificar: false
      };
    }
  }

  ngOnInit() {
    this.socketService.conexionEscucha(JSON.parse(localStorage.getItem('nombreSala')));
    this.socketService.getEstado().subscribe(response => {
      this.cacharEstado(response);
      console.log(response);
    });

    this.cartaServicio.getCarta(JSON.parse(localStorage.getItem('idCarta'))).subscribe(
      response => {
        if (response) {
          this.ArrgeloCarta = response;
          //console.log("Holi");
          //console.log(this.ArrgeloCarta);
          this.NumCarta = this.ArrgeloCarta[0].idcarta;
          this.Carta[0] = this.ArrgeloCarta[0].p1;
          this.Carta[1] = this.ArrgeloCarta[0].p2;
          this.Carta[2] = this.ArrgeloCarta[0].p3;
          this.Carta[3] = this.ArrgeloCarta[0].p4;
          this.Carta[4] = this.ArrgeloCarta[0].p5;
          this.Carta[5] = this.ArrgeloCarta[0].p6;
          this.Carta[6] = this.ArrgeloCarta[0].p7;
          this.Carta[7] = this.ArrgeloCarta[0].p8;
          this.Carta[8] = this.ArrgeloCarta[0].p9;
          this.Carta[9] = this.ArrgeloCarta[0].p10;
          this.Carta[10] = this.ArrgeloCarta[0].p11;
          this.Carta[11] = this.ArrgeloCarta[0].p12;
          this.Carta[12] = this.ArrgeloCarta[0].p13;
          this.Carta[13] = this.ArrgeloCarta[0].p14;
          this.Carta[14] = this.ArrgeloCarta[0].p15;
          this.Carta[15] = this.ArrgeloCarta[0].p16;
        } else {
          this.ArrgeloCarta = [];
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  //
  childdata = "";
  //CONEXION CON EL COMPOENETE MENUJUGADA, OBTIENE EL NUMERO DE LA JUGADA A VERIFICAR
  onClicked(value: string) {

    this.childdata = value;
    //MANDA A VERIFICAR

    this.VerificarJugar(value);

    console.log("Selec:", this.Selec)
  }
  Holi(pos) {
    //En pos viene el id de la carta en cuestion
    //console.log("Holi "+ this.Carta[pos]);

    if (this.Selec[pos] == 1) {
      this.Selec[pos] = 0;
    } else {
      this.Selec[pos] = 1;
    }
  }

  //AQUI SE MANDARA LA JUGADA A VERIFICAR 
  VerificarJugar(jugada: string) {

    console.log("jugada:", jugada);
    if (jugada == '0')
      this.Chorro();

    if (jugada == '1')
      this.Centro();
    if (jugada == '2')
      this.Esquinas();
    if (jugada == '3')
      this.Llena();




    console.log("Verificar cartas:", this.cartasAverificar);


  }

  //Para verificar con back-end las jugadas se le enviara Un arreglo con las cartas de tal jugada
  //Los 4 metodos devuelven un arreglo con las cartas a vericar
  // el arreglo son las cartas con las que se hicieron chorrro 
  //el unico que no manda un arreglo de 4 es  la llena es de 16 

  public Chorro() {

    this.cartasAverificar.length = 0;

    this.chorro = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < this.Carta.length; i++) {
      if (this.Selec[i] == 1) {
        this.chorro[i] = this.Carta[i];
      } else {
        this.chorro[i] = 0;
      }
    }

    this.arreglo[0] = [this.chorro[0], this.chorro[1], this.chorro[2], this.chorro[3]];
    this.arreglo[1] = [this.chorro[4], this.chorro[5], this.chorro[6], this.chorro[7]];
    this.arreglo[2] = [this.chorro[8], this.chorro[9], this.chorro[10], this.chorro[11]];
    this.arreglo[3] = [this.chorro[12], this.chorro[13], this.chorro[14], this.chorro[15]];
    this.arreglo[4] = [this.chorro[0], this.chorro[4], this.chorro[8], this.chorro[12]];
    this.arreglo[5] = [this.chorro[1], this.chorro[5], this.chorro[9], this.chorro[13]];
    this.arreglo[6] = [this.chorro[2], this.chorro[6], this.chorro[10], this.chorro[14]];
    this.arreglo[7] = [this.chorro[3], this.chorro[7], this.chorro[11], this.chorro[15]];
    this.arreglo[8] = [this.chorro[0], this.chorro[5], this.chorro[10], this.chorro[15]];
    this.arreglo[9] = [this.chorro[12], this.chorro[9], this.chorro[6], this.chorro[3]];

    //VERIFICAR CHORRO
    this.socketService.verificarChorro(this.payload, this.arreglo);
  }

  Centro() {
    if (this.Selec[5] == 1) {
      this.cartasAverificar[0] = this.Carta[5];
    } else {
      this.cartasAverificar[0] = 0;
    }
    if (this.Selec[6] == 1) {
      this.cartasAverificar[1] = this.Carta[6];
    } else {
      this.cartasAverificar[1] = 0;
    }
    if (this.Selec[9] == 1) {
      this.cartasAverificar[2] = this.Carta[9];
    } else {
      this.cartasAverificar[2] = 0;
    }
    if (this.Selec[10] == 1) {
      this.cartasAverificar[3] = this.Carta[10];
    } else {
      this.cartasAverificar[3] = 0;
    }

    //VERIFICAR centro
    this.socketService.verificarCentro(this.payload, this.cartasAverificar);
  }




  Esquinas() {
    if (this.Selec[0] == 1) {
      this.cartasAverificar[0] = this.Carta[0];
    } else {
      this.cartasAverificar[0] = 0;
    }
    if (this.Selec[3] == 1) {
      this.cartasAverificar[1] = this.Carta[3];
    } else {
      this.cartasAverificar[1] = 0;
    }
    if (this.Selec[12] == 1) {
      this.cartasAverificar[2] = this.Carta[12];
    } else {
      this.cartasAverificar[2] = 0;
    }
    if (this.Selec[15] == 1) {
      this.cartasAverificar[3] = this.Carta[15];
    } else {
      this.cartasAverificar[3] = 0;
    }

    //VERIFICAR ESQUINAS
    this.socketService.verificarEsquinas(this.payload, this.cartasAverificar);
  }

  Llena() {
    var llenas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (var i = 0; i < this.Selec.length; i++) {
      if (this.Selec[i] == 1) {
        llenas[i] = this.Carta[i];
      } else {
        llenas[i] = 0;
      }
    }

    //VERIFICAR LLENAS
    this.socketService.verificarLlenas(this.payload, llenas);
  }



}
