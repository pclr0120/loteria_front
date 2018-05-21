import { Component, OnInit } from '@angular/core';

import { GraficasService } from '../servicios/graficas.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {
  public nombres: any = []
  public numer: any = []
public barChartsOptions: any 
    public barChartLabels: string[] 
  public barChartType: string 
  public barChartLegend: boolean 

  public barChartData: any[] 


  constructor(private grafica: GraficasService) {
    this.grafica.getGrafica2().subscribe(res => {
      for (var _i = 0; _i < res.length; _i++) {
        let numero = res[_i].numero;
        let id = res[_i].idCarta;
        this.numer[_i] = Number(numero);
        this.nombres[_i] = id;
      }
      this.barChartsOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      }
      this.barChartLabels = this.nombres;
      this.barChartType= 'bar';
      this.barChartLegend = true
      this.barChartData =  [
        { data: this.numer, label: 'Numero de veces' }];
      
    })
    
  }

  ngOnInit() {
 
  }

}
