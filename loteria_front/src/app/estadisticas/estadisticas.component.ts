import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  grafica() {       
    this.router.navigate(['/grafica1']);

  }
  jugadas() {       
    this.router.navigate(['/jugadas']);

  }
}
