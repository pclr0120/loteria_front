import { Component, OnInit,EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  NumCarta = 1;
  Carta: any[] = [3,6,1,2,11,12,13,14,15,16,21,23,24,45,34,42];
  Selec: any[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  constructor() { }

  ngOnInit() {
  }

//
  childdata="";
//CONEXION CON EL COMPOENETE MENUJUGADA, OBTIENE EL NUMERO DE LA JUGADA A VERIFICAR
  onClicked(value:string){

    this.childdata=value;
    //MANDA A VERIFICAR
    this.VerificarJugar();
  }
  Holi(pos){
    //En pos viene el id de la carta en cuestion
    console.log("Holi "+ this.Carta[pos]);
    if(this.Selec[pos] == 1){
      this.Selec[pos] = 0;
    }else{
      this.Selec[pos] = 1;
    }
  }

  //AQUI SE MANDARA LA JUGADA A VERIFICAR 
  VerificarJugar(){
    console.log("VErificando jugada");
  }



}
