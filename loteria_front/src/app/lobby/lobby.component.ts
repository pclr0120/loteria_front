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
  public sala;
  public idSala;

  constructor(private router: Router, 
    private socketService:SocketService,
    private salasService:SalasService) { 
    
  }
  ngOnInit() {
    //ESTO SE TIENE QUE QUITAR NADA MAS ESTA PARA PRUEBAS
    this.socketService.addUser("","");
    this.socketService.getSalas().subscribe(response => {
      this.Salas = response;
      
      //console.log(this.Salas);
    });
    this.getSalas();
  }

  ngOnDestroy() {
    //this.socketService.Desconectar();
  }

  nuevapartida() {       
    this.router.navigate(['/nuevapartida']);

  }
estadisticas() {       
    this.router.navigate(['/estadisticas']);

  }
  ingresarSala(id_carta){
    //ESTO SE TIENE QUE DESCOMENTAR
    this.socketService.addUser(JSON.parse(localStorage.getItem('identity')), this.sala);
    console.log("ID CARTA: " + id_carta);
    this.socketService.AgregarCartaSelect(id_carta,this.sala);
    console.log("Sala " + this.sala);
    localStorage.setItem('nombreSala',JSON.stringify(this.sala));
    
    localStorage.setItem('idCarta',JSON.stringify(id_carta + 1));
    console.log("Sala " + JSON.parse(localStorage.getItem('nombreSala')));

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

  guardarSala(sala){
    this.sala = sala;
    console.log("SALAAAAAAAAAAAAA: " + this.sala);
    
    for(var i=0;i<this.Salas.length;i++){
      if(this.Salas[i].nombreSala == this.sala){
        console.log(this.cartasSelec);
        console.log(this.Salas[i].cartasSelect);
        this.cartasSelec = this.Salas[i].cartasSelect;
        //AGREGAR IDSALA AL LOCALSTORAGE
        console.log("azucena")
        this.salasService.getSalaNombre(this.sala)
        .subscribe(sala => localStorage.setItem('idSala',JSON.stringify(sala[0].idSala))) 
    
        
      }
    }
  }
}