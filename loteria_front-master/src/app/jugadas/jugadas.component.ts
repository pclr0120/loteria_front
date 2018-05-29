import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GraficasService } from '../servicios/graficas.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-jugadas',
  templateUrl: './jugadas.component.html',
  styleUrls: ['./jugadas.component.css']
})
export class JugadasComponent {
  public nombres = []
  public numer = []

  public doughnutChartLabels: string[]
  public doughnutChartData: number[]
  public doughnutChartType: string
  public id;


  constructor(private grafica: GraficasService, private router: Router, private activatedRouter: ActivatedRoute) {

    this.activatedRouter.params
      .subscribe(parametros => {
        this.id = parametros['id'];

console.log(this.id)

        this.grafica.getGrafica1(this.id).subscribe(res => {
          for (var _i = 0; _i < res.length; _i++) {
            let numero = res[_i].numero;
            let nombre = res[_i].userName;
            this.numer[_i] = Number(numero);
            this.nombres[_i] = nombre;
    
          }
          this.doughnutChartLabels = this.nombres;
          this.doughnutChartData = this.numer;
          this.doughnutChartType = 'doughnut';
        })


      });




  }
}
