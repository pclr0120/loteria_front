import { Component, OnInit } from '@angular/core';
import { RegistrousuarioService } from '../servicios/registrousuario.service';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServiciologinService } from '../servicios/serviciologin.service';
import { Response } from '@angular/http/src/static_response';
import { Router, ActivatedRoute } from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Falta validar que las contras esten iguales
  //Falta que funcionen las validaciones
  //Mandar mensajes  de error y exito
  //Falta cerrar sesion, no lo hicimos porque aun no esta la sala.
  constructor(private router: Router, private LoginService: ServiciologinService, private registrousuarioService: RegistrousuarioService, private formBuilder: FormBuilder) { }
  //Registro
  RegistroUsuarioForm: FormGroup;
  usuario: any;
  id: any;
  user: any;
  public identity;
  onValueChanged(data?: any) {
    if (!this.RegistroUsuarioForm) { return; }
    const form = this.RegistroUsuarioForm;
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
    'correo': '',
    'contra': ''
  }
  mensajesvalidacion = {
    'correo': {
      'required': 'Correo Electronico obligatorio',
      'email': 'Introduzca un correo valido'
    },
    'contra': {
      'required': 'Contraseña obligatorio',
      'minlength': 'La contraseña debe de tener mas de 6 caracteres'
    }
  }
  ngOnInit() {
    this.RegistroUsuarioForm = this.formBuilder.group(
      {
        'correo': ['', [
          Validators.required,
          Validators.email]
        ],
        'contra': ['', [
          Validators.required,
          Validators.minLength(6)]
        ],
        idUsuario: '',
        userName: '',
        genero: '',
        fechaNacimiento: '',
        estado: '',
        contraconf: ''
      }
    )
    this.RegistroUsuarioForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  registrar() {
    this.registrousuarioService.getObtenerNumUser().subscribe(
      response => {
        this.id = response[0].Usuarios
        this.usuario = this.GuardarUsuario();
        this.registrousuarioService.postUser(this.usuario)
          .subscribe(newpres => { })
        console.log(this.usuario)
        //Aqui mandar mensaje que si se registro 

      }
    )
  //  this.iniciarsesion();
  }

  iniciarsesion() {
    this.usuario = this.GuardarUsuarioLogin();
    this.LoginService.signup(this.usuario)
      .subscribe(response => {
        this.identity = response
        localStorage.setItem('Identity', JSON.stringify(this.identity))
        if (this.identity != "Undefined") {
          //Si hay logeado se va a salas
      //    this.router.navigate(['/lobby'])
        }
      },
      error => {
        //Posibles errores
        console.log(error._body);
      })
  }

  GuardarUsuario() {
    const guardarusuario = {
      idUsuario: Number(this.id) + Number(1),
      userName: this.RegistroUsuarioForm.get('userName').value,
      correo: this.RegistroUsuarioForm.get('correo').value,
      contrasena: this.RegistroUsuarioForm.get('contra').value,
      fechaNacimiento: this.RegistroUsuarioForm.get('fechaNacimiento').value,
      genero: this.RegistroUsuarioForm.get('genero').value,
      estado: 'A',
    }
    return guardarusuario;
  }
  GuardarUsuarioLogin() {
    const guardarusuariologin = {

      userName: this.RegistroUsuarioForm.get('userName').value,
      contrasena: this.RegistroUsuarioForm.get('contra').value,

    }
    return guardarusuariologin;
  }

}