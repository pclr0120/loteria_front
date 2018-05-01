import { Component, OnInit,EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-menu-jugadas',
  templateUrl: './menu-jugadas.component.html',
  styleUrls: ['./menu-jugadas.component.css']
})
export class MenuJugadasComponent implements OnInit {
  //Jugadas 
Jugadas:any[]=["CENTRO","CHORRO","4 ESQUINAS","LLENA"];
//monedas 
  Apuesta: any[] = [20,30,10,50];
  //acumulado
  acu:any=200;
  //Verificacion de jugadas 1 para jugada verificada 0 para diponible
  JugadaV:any[]=[true,false,true,false]
  constructor() { }
  

  //Apuesta de cada jugada
  @Input() ciudad: string;
  @Input('pais') nacionReal: string;
  public nombre:string;
  // Usamos el decorador Output
  @Output() PasameElPueblo = new EventEmitter();
  lanzar(event){
    // Usamos el método emit
this.PasameElPueblo.emit({nombre: this.nombre});
}

  ngOnInit() {
  }

  jugada1(){


  }
  jugada2(){

    
  }
  jugada3(){

    
  }
  jugada4(){

    
  }

}
