import { Component, OnInit , ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { SalasService } from '../servicios/salas.service';
import { Response } from '@angular/http/src/static_response';
import { Router, ActivatedRoute } from "@angular/router"
import { max } from 'rxjs/operator/max';
import { SocketService } from '../servicios/socket.service';

@Component({
  selector: 'app-nuevapartida',
  templateUrl: './nuevapartida.component.html',
  styleUrls: ['./nuevapartida.component.css'],
  providers: [SocketService,SalasService]
})
export class NuevapartidaComponent implements OnInit {
 /* @ViewChild('formpro') formpro: NgForm;
  RegistroNuevaPartidaForm: FormGroup;
  nuevapartida: any;
  id: any;*/
constructor(private router: Router, private SalasService: SalasService, private formBuilder: FormBuilder, private socketService:SocketService) { }
  RegistroNuevaPartidaForm: FormGroup;
  nuevapartida: any;
  id: any;
  public identity;
  public cartasSelec = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //HOLIIIIII

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
    //ESTO SE VA A QUITAR ES PARA PRUEBAS NADA MAS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    localStorage.setItem('identity',JSON.stringify('adrian'));


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
        this.id = response[0].Max;        
        this.nuevapartida = this.GuardarSala();
        this.SalasService.postNuevaPartida(this.nuevapartida)
          .subscribe(newpres => { 
            console.log(newpres);
            this.socketService.addUser(JSON.parse(localStorage.getItem('identity')) , this.nuevapartida.nombreSala);
            //this.socketService.EmitirEstadoPartida();
            this.partida();
          })
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
    this.socketService.iniciarPartida();
    localStorage.setItem('nombreSala',JSON.stringify(this.nuevapartida.nombreSala));
    this.router.navigate(['/partida'])

  }


}
