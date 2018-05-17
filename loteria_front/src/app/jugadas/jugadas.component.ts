import { Component, OnInit } from '@angular/core';

import { GraficasService } from '../servicios/graficas.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-jugadas',
  templateUrl: './jugadas.component.html',
  styleUrls: ['./jugadas.component.css']
})
export class JugadasComponent  {
  public nombres  =  []
  public numer=  []
// Doughnut
//public doughnutChartLabels:string[] = this.nombres;
public doughnutChartLabels:string[] = ["chorro", "cuatro", "centro", "llenas"];
//public doughnutChartData:number[] = this.numer;
public doughnutChartData:number[] = [20,40,100,80];
public doughnutChartType:string = 'doughnut';

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

constructor(private grafica: GraficasService) {
  this.grafica.getGrafica1().subscribe(res => {
    for (var _i = 0; _i < res.length; _i++) {
      let numero = res[_i].numero;
      let nombre = res[_i].userName;
      this.numer[_i] =Number(numero) ;
      this.nombres[_i]=nombre;

    }

  })
  console.log(this.nombres)
  console.log(this.numer)

 }
}
