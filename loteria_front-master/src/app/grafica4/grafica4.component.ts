import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../servicios/graficas.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-grafica4',
  templateUrl: './grafica4.component.html',
  styleUrls: ['./grafica4.component.css']
})
export class Grafica4Component implements OnInit {
  public nombres: any = []
  public numer: any = []
  public barChartsOptions: any
  public barChartLabels: string[]
  public barChartType: string
  public barChartLegend: boolean
  public id =JSON.parse(localStorage.getItem('idUsuario')); 
  public barChartData: any[]


  constructor(private grafica: GraficasService) {
    //esque se supone que aquí le tengo que mandar el this.id no?
    this.grafica.getGrafica4(this.id).subscribe(res => {
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
      this.barChartType = 'bar';
      this.barChartLegend = true
      this.barChartData = [
        { data: this.numer, label: 'Numero de veces' }];

    })
  }

  ngOnInit() {
  }

}
