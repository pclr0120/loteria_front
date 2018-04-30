import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServiciologinService } from '../servicios/serviciologin.service';
import { Response } from '@angular/http/src/static_response';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private LoginService: ServiciologinService, private router: Router, private formBuilder: FormBuilder) { }
  //Registro
  LoginForm: FormGroup;
  usuario: any;
  public identity;

  onValueChanged(data?: any) {
    if (!this.LoginForm) { return; }
    const form = this.LoginForm;
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
  erroresform =
    {
      'userName': '',
      'contra': ''
    }
  mensajesvalidacion = {
    'userName': {
      'required': 'Correo Electronico obligatorio',
      'email': 'Introduzca un correo valido'
    },
    'contra': {
      'required': 'Contraseña obligatorio',
      'minlength': 'La contraseña debe de tener mas de 6 caracteres'
    }
  }
  ngOnInit() {
    this.LoginForm = this.formBuilder.group(
      {
        'userName': ['', [
          Validators.required,
          Validators.email]
        ],
        'contra': ['', [
          Validators.required,
          Validators.minLength(6)]
        ]

      }
    )
    this.LoginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }



  iniciarsesion() {
    this.usuario = this.GuardarUsuario();
    this.LoginService.signup(this.usuario)
      .subscribe(response => {
        this.identity = response
        localStorage.setItem('Identity', JSON.stringify(this.identity))
        if (this.identity != "Undefined") {

          
          this.router.navigate(['/lobby'])

        } 
        else
         {

        }
      },
      error => {


        console.log(error._body);


      })

  }

  GuardarUsuario() {
    const guardarusuario = {

      userName: this.LoginForm.get('userName').value,
      contrasena: this.LoginForm.get('contra').value,

    }
    return guardarusuario;
  }
}
