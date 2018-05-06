import { Component, OnInit } from '@angular/core';
import { SocketService } from '../servicios/socket.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css'],
  providers:[SocketService]
})
export class PartidaComponent implements OnInit {

  constructor(private socketService:SocketService) {

  }

  ngOnInit() {
    console.log("data");
    //this.socketService.addUser("adrian" , "Sala8");
    this.socketService.getEstadoPartida().subscribe(data => {
      console.log(data);
    });
  }

}
