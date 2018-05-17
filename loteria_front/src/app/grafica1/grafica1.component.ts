import { Component, OnInit } from '@angular/core';

import { GraficasService } from '../servicios/graficas.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {
  public nombres : any =  []
  public numer : any =  []
  
  
  public barChartsOptions:any = {
    
    scaleShowVerticalLines : false,
    responsive : true
  }
  //public barChartsLabels:string []= this.nombres;
  
  public barChartLabels:string[] = this.nombres;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
  public barChartData:any[] = [
   {data: this.numer, label: 'Numero'}];
  
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
   }

  ngOnInit() {
  }

}
