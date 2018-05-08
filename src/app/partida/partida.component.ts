import { Component, OnInit } from '@angular/core';
import { SocketService } from '../servicios/socket.service';
import { CartaService } from '../servicios/carta.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css'],
  providers:[SocketService,CartaService]
})
export class PartidaComponent implements OnInit {

  public ArrgeloCarta: any[];

  constructor(private socketService:SocketService,
    private cartaServicio:CartaService) {

  }

  ngOnInit() {
    this.cartaServicio.getCarta(JSON.parse(localStorage.getItem('idCarta'))).subscribe(
      response=>{
        if(response){
          this.ArrgeloCarta = response;
          console.log(this.ArrgeloCarta);
        }else{
          this.ArrgeloCarta=[];
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
    //this.socketService.addUser("adrian" , "Sala8");
    /*this.socketService.getEstadoPartida().subscribe(data => {
      console.log(data);
    });*/
  }

}
