import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client"
import { ThrowStmt } from '@angular/compiler';
import { Router, ActivatedRoute } from "@angular/router";
import { SocketService } from '../servicios/socket.service';
import { SalasService } from '../servicios/salas.service';
import { Observable } from 'rxjs/Rx';

var pru: any;
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  providers: [SocketService,SalasService]
})
export class LobbyComponent implements OnInit {
  public Salas:any;
  public Salas_BD: any[];
  public cartasSelec = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //HOLIIIIII
  

  constructor(private router: Router, 
    private socketService:SocketService,
    private salasService:SalasService) { 
    
  }
  ngOnInit() {
    //ESTO SE TIENE QUE QUITAR NADA MAS ESTA PARA PRUEBAS
    this.socketService.addUser("adrian" , "Sala-PRO");
    this.socketService.getSalas().subscribe(response => {
      this.Salas = response;
      //console.log(this.Salas);
    });
    this.getSalas();
  }

  ngOnDestroy() {
    this.socketService.Desconectar();
  }

  nuevapartida() {       
    this.router.navigate(['/nuevapartida']);

  }

  ingresarSala(nombreSala){
    //ESTO SE TIENE QUE DESCOMENTAR
    //this.socketService.addUser(usuario , nombreSala);
    localStorage.setItem('nombreSala',JSON.stringify(nombreSala));
    this.router.navigate(['/partida']);
  }

  getSalas(){
    this.salasService.getSalas().subscribe(
      response=>{
        if(response){
          this.Salas_BD = response;
          console.log(this.Salas_BD);
        }else{
          this.Salas_BD=[];
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
}
