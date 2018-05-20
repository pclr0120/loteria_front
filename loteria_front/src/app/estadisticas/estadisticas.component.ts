import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  estadisticasform: FormGroup;
  

  constructor(private router: Router, private formBuilder: FormBuilder) { 
    this.estadisticasform = new FormGroup({
      jugadas: new FormControl()
   });
  }

  ngOnInit() {
  }

  grafica() {       
    this.router.navigate(['/grafica1' ]);
  }
  grafica2() {       
    this.router.navigate(['/grafica2']);
  }
  grafica3() {       
    this.router.navigate(['/grafica3' ]);
  }
  grafica4() {       
    this.router.navigate(['/grafica4']);
  }
  grafica5() {       
    this.router.navigate(['/grafica5']);
  }
  jugadas() {       
    this.router.navigate(['/jugadas/' +  this.estadisticasform.get('jugadas').value ]);
  }
}
