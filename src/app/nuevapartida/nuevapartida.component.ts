import { Component, OnInit , ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { SalasService } from '../servicios/salas.service';
import { Response } from '@angular/http/src/static_response';
import { Router, ActivatedRoute } from "@angular/router"
import { max } from 'rxjs/operator/max';
@Component({
  selector: 'app-nuevapartida',
  templateUrl: './nuevapartida.component.html',
  styleUrls: ['./nuevapartida.component.css']
})
export class NuevapartidaComponent implements OnInit {
 /* @ViewChild('formpro') formpro: NgForm;
  RegistroNuevaPartidaForm: FormGroup;
  nuevapartida: any;
  id: any;*/
constructor(private router: Router, private SalasService: SalasService, private formBuilder: FormBuilder) { }
RegistroNuevaPartidaForm: FormGroup;
nuevapartida: any;
id: any;
public identity;
onValueChanged(data?: any) {
  if (!this.RegistroNuevaPartidaForm) { return; }
  const form = this.RegistroNuevaPartidaForm;
  for (const field in this.erroresform) {
    this.erroresform[field] = '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
      const messages = this.mensajesvalidacion[field];
      for (const key in control.errors) {
        this.erroresform[field] += messages[key] + ' ';
      }
    }
  }
}
erroresform = {
  'nombreSala': ''
}
mensajesvalidacion = {
  'nombreSala': {
    'required': 'Nombre de sala obligatorio',
  }
}
ngOnInit() {
  this.RegistroNuevaPartidaForm = this.formBuilder.group(
    {
      
        'nombreSala': ['', [
          Validators.required,
          ]
        ],

      idSala: '',
      modo: ['',Validators.required],
      contra: ['',Validators.required],
      numeroJugadores:'',
      estado: '',


    }
  )
  this.RegistroNuevaPartidaForm.valueChanges.subscribe(data => this.onValueChanged(data));
  this.onValueChanged();
}

saveNuevaPartida() {
  this.SalasService.getObtenerNumSala().subscribe(
    response => {
      this.id = response[0].Salas
      this.nuevapartida = this.GuardarSala();
      this.SalasService.postNuevaPartida(this.nuevapartida)
        .subscribe(newpres => { })
      console.log(this.nuevapartida)
      //Aqui mandar mensaje que si se registro 

    }
  )
//  this.iniciarsesion(); 
}
GuardarSala() {
  const guardarsala = {
  
    idSala: Number(this.id) + Number(1),
    nombreSala: this.RegistroNuevaPartidaForm.get('nombreSala').value,
    modo: this.RegistroNuevaPartidaForm.get('modo').value,
    contra: this.RegistroNuevaPartidaForm.get('contra').value,
    numeroJugadores: this.RegistroNuevaPartidaForm.get('numeroJugadores').value,
    estado: 'A',
  }
  return guardarsala;
}
partida() {       
  this.router.navigate(['/partida'])

}


}
