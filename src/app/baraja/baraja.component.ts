import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";

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
    var socket=io.connect("https://loteria-backend.herokuapp.com/");
    socket.on('prueba',(data)=>{
    //asignacion del numero que aroja el socket a la variable 
    this.number=data.prueba;

    //aqui se usa ese numero para cambiar la imagen que se muestra arriba
    this.imagen ="../assets/Resources/Baraja/"+this.number+".PNG";

    //las rutas se van almacenando en el arreglo "vector"
    this.vector.push(this.imagen); 

    //si aun no llega a ese numero de Baraja solo se muestra el reverso
    
      this.ultimo = this.vector[this.vector.length - 1];
      
    if (this.vector.length < 3){
       this.penultimo = "../assets/Resources/Baraja/0.jpg";
    }else{
      this.penultimo = this.vector[this.vector.length - 2];
      }

    if (this.vector.length < 4){
    this.antepenultimo = "../assets/Resources/Baraja/0.jpg";
    }else{
    this.antepenultimo = this.vector[this.vector.length - 3];
    }
    console.log(this.vector.length);
    });
   }
   

  ngOnInit() {
  } 

}
