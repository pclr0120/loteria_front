import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../servicios/graficas.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-grafica3',
  templateUrl: './grafica3.component.html',
  styleUrls: ['./grafica3.component.css']
})
export class Grafica3Component implements OnInit {
  public canti: any = []
  public premios: any = []
  public barChartsOptions: any
  public barChartLabels: string[]
  public barChartType: string
  public barChartLegend: boolean
  public id =JSON.parse(localStorage.getItem('idUsuario'));
  public barChartData: any[]


  constructor(private grafica: GraficasService) {
    this.grafica.getGrafica3(this.id).subscribe(res => {
      for (var _i = 0; _i < res.length; _i++) {
        let premi = res[_i].idPremio;
        let cantidad = res[_i].CANTIDAD;
        this.premios[_i] = Number(premi);
        this.canti[_i] = cantidad;
      }
      this.barChartsOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      }
      this.barChartLabels = this.premios;
      this.barChartType = 'bar';
      this.barChartLegend = true
      this.barChartData = [
        { data: this.canti, label: 'Numero de veces' }];
    })
  }

  ngOnInit() {
  }

}
