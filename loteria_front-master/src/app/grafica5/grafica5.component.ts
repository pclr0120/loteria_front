import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../servicios/graficas.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-grafica5',
  templateUrl: './grafica5.component.html',
  styleUrls: ['./grafica5.component.css']
})
export class Grafica5Component implements OnInit {

  public idsala: any = []
  public Num_Partidas: any=[]
    // Pie
    public pieChartLabels:string[] 
    public pieChartData:any[] 
    public pieChartType:string 
    public barChartLegend:boolean
  
  
  
    constructor(private grafica: GraficasService) { 
      this.grafica.getGrafica5().subscribe(res => {
        for (var _i = 0; _i < res.length; _i++) {
          let Num = res[_i].Num_partidas;
          let id = res[_i].idSala;
          this.Num_Partidas[_i] =Num ;
          this.idsala[_i]=id;
  
        }
        this.pieChartLabels = this.idsala;
        this.pieChartData  = this.Num_Partidas;
  this.pieChartType = 'pie';
  this.barChartLegend  = true;
      })
    }
  
    ngOnInit() {
    }

}
