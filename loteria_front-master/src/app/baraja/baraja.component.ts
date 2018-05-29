import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'rxjs/operator/isEmpty';
import { forEach } from '@angular/router/src/utils/collection';
import { ajaxGetJSON } from 'rxjs/observable/dom/AjaxObservable';
import * as io from "socket.io-client";
import { SocketService } from '../servicios/socket.service';
//var socket = io.connect('http://localhost:8080', {'forceNew':true});
var socket = io.connect('http://ec2-18-217-208-255.us-east-2.compute.amazonaws.com:4000', {'forceNew':true});

@Component({
  selector: 'app-baraja',
  templateUrl: './baraja.component.html',
  styleUrls: ['./baraja.component.css'],
  providers: [SocketService]
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

  constructor(private socketService:SocketService) {
    this.imagen = "../assets/Resources/Baraja/0.png";
    this.ultimo = "../assets/Resources/Baraja/0.png";
    this.penultimo = "../assets/Resources/Baraja/0.png";
    this.antepenultimo = "../assets/Resources/Baraja/0.png";
    var payload={
      autor: "Saul",
      text: "",
      verificar: false
    };
   }
   

   getNumerosBaraja(data){
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

    if (this.vector.length < 3){
      this.ultimo = "../assets/Resources/Baraja/0.png";
   }else{
      this.ultimo = this.vector[this.vector.length - 2];
      }
    if (this.vector.length < 4){
       this.penultimo = "../assets/Resources/Baraja/0.png";
    }else{
      this.penultimo = this.vector[this.vector.length - 3];
      }
    if (this.vector.length < 5){
        this.antepenultimo = "../assets/Resources/Baraja/0.png";
    }else{
    this.antepenultimo = this.vector[this.vector.length - 4];
      }
    console.log(this.vector.length);
    }

    cacharEstado(res){
      if(res=="Iniciando Partida"){
        this.imagen = "../assets/Resources/Baraja/0.png";
        this.ultimo = "../assets/Resources/Baraja/0.png";
        this.penultimo = "../assets/Resources/Baraja/0.png";
        this.antepenultimo = "../assets/Resources/Baraja/0.png";
      }
    }

  ngOnInit() {
    this.socketService.conexionEscucha(JSON.parse(localStorage.getItem('nombreSala')));
    this.socketService.getNumerosBaraja().subscribe(response => {
      this.getNumerosBaraja(response);
    });

    this.socketService.getEstado().subscribe(response => {
      this.cacharEstado(response);
      console.log(response);
    });
  } 

}
