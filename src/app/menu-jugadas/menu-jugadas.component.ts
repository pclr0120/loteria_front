import { Component, OnInit,EventEmitter,  Output , Input } from '@angular/core';
import * as io from "socket.io-client";
import { isEmpty } from 'rxjs/operator/isEmpty';
import { forEach } from '@angular/router/src/utils/collection';
import { ajaxGetJSON } from 'rxjs/observable/dom/AjaxObservable';
var socket = io.connect('http://localhost:8080', {'forceNew':true});

@Component({
  selector: 'app-menu-jugadas',
  templateUrl: './menu-jugadas.component.html',
  styleUrls: ['./menu-jugadas.component.css']
})
export class MenuJugadasComponent implements OnInit {
  //Jugadas 
Jugadas:any[]=["CHORRO","CENTRO","4 ESQUINAS","LLENA"];
//monedas 
  Apuesta: any[] = [20,30,10,50];
  //acumulado
  acu:any=200;
  //Verificacion de jugadas 1 para jugada verificada 0 para diponible
  JugadaV:any[]=[false,false,false,false]
  constructor() { 
    socket = io.connect('http://localhost:8080', {'forceNew':true});
    socket.on('jugada',function(data) {
      console.log(data);
      if(data.jugada=="Chorro" && data.verificar==true){
        
      }
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