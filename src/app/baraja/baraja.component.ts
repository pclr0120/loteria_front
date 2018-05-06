import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'rxjs/operator/isEmpty';
import { forEach } from '@angular/router/src/utils/collection';
import { ajaxGetJSON } from 'rxjs/observable/dom/AjaxObservable';
import * as io from "socket.io-client";
var socket = io.connect('http://localhost:8080', {'forceNew':true});
@Component({
  selector: 'app-baraja',
  templateUrl: './baraja.component.html',
  styleUrls: ['./baraja.component.css']
})
export class BarajaComponent implements OnInit {
  title = "app";
  number:number;
  imagen: string;
  vector = ["0"];
  ultimo: string;
  penultimo: string;
  antepenultimo: string;
  
  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect('http://localhost:8080', {'forceNew':true});
    var payload={
      autor: "Saul",
      text: "",
      verificar: false
    };

    this.socket.emit('adduser', "saul", "sala1");
    this.socket.on('numerosBaraja',(data)=>{
    //asignacion del numero que aroja el socket a la variable 
    if (this.number==0){
      var audio = new Audio("../assets/Resources/Sonidos/1 (0).mp3");
    audio.play();
    }
    this.number=data;

    var audio = new Audio("../assets/Resources/Sonidos/1 ("+this.number+").mp3");
    audio.play();
    //aqui se usa ese numero para cambiar la imagen que se muestra arriba
    this.imagen ="../assets/Resources/Baraja/"+this.number+".PNG";

    //las rutas se van almacenando en el arreglo "vector"
    this.vector.push(this.imagen); 

    //si aun no llega a ese numero de Baraja solo se muestra el reverso
    
      this.ultimo = this.vector[this.vector.length - 1];
      
    if (this.vector.length < 3){
       this.penultimo = "../assets/Resources/Baraja/0.png";
    }else{
      this.penultimo = this.vector[this.vector.length - 2];
      }

    if (this.vector.length < 4){
    this.antepenultimo = "../assets/Resources/Baraja/0.png";
    }else{
    this.antepenultimo = this.vector[this.vector.length - 3];
    }
    //console.log(this.vector.length);
    });
   }
   

  ngOnInit() {
    var payload={
      autor: "Saul",
      text: "",
      verificar: false
    };
    //this.socket.emit('prueba',payload);
  } 

}
