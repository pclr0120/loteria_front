import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServiciologinService } from '../servicios/serviciologin.service';
import { Response } from '@angular/http/src/static_response';
import { Router, ActivatedRoute } from "@angular/router";
declare let paypal: any;
declare let $;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private LoginService: ServiciologinService, private router: Router, private formBuilder: FormBuilder) { 
 
  }
  //Registro
  LoginForm: FormGroup;
  PayForm: FormGroup;
  usuario: any;
  public identity;
  public datos;
  public estadoLog = 0;

  public didPaypalScriptLoad: boolean = false;
  public loading: boolean = true;
  cantidad;


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
    this.PayForm = this.formBuilder.group(
      {
        'comprar': ['Comprar...', [
          Validators.required,
        ]]
      }
    )
  }

  iniciarsesion() {
    this.usuario = this.GuardarUsuario();
    this.LoginService.signup(this.usuario)
      . subscribe(response => {
        this.identity = response
        localStorage.setItem('Identity', JSON.stringify(this.identity))
        if (this.identity != "Undefined") {

          this.router.navigate(['/lobby']);

          console.log("Holi");
          this.datos =this.LoginService.getIdentity(); 
          this.estadoLog = 1;
          document.getElementById('paypal-button').style.display = "block";
          document.getElementById('comprar').style.display = "block";
        } 
        else
        {
          console.log("Holi else");
        }
      },
      error => {
        console.log(error._body);
      })
  }

  GuardarUsuario() {
    const guardarusuario = {
      userName: this.LoginForm.get('userName').value,
      contrasena: this.LoginForm.get('contra').value
    }
    return guardarusuario;
  }

  cerrarSesion(){
    localStorage.setItem('Identity', '');
    this.estadoLog = 0;
    this.router.navigate(['/']);
    document.getElementById('paypal-button').style.display = "none";
    document.getElementById('comprar').style.display = "none";
  }

  pagar() {
    this.cantidad = this.PayForm.get('comprar').value;
    console.log(this.cantidad);
  }

  public paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox: 'Ae4f8IELIjpQX_Zz8y-7QiSJmHgbkt3TQBD9S9-7rOZwYAKQrgWaxsZ9vAgwtxx5H1CzIfd_hWBecoaj',
      production: 'xxxxxxxxxx'
    },
    commit: true,
    payment: (data, actions) => {
      this.pagar();
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.cantidad, currency: 'MXN' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      console.log('Pago completado!');
      this.datos.usuario.cash = this.datos.usuario.cash + this.cantidad;
      //Actualizar cash en la Base de Datos
    },
    onCancel: function(data) {
      console.log('Pago cancelado!');

    },
    locale: 'es_ES',
    style: {
        size: 'small',
        color: 'gold',
        shape: 'rect',
        label: 'checkout'
    }
  };

  public ngAfterViewChecked(): void {
    if(!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
      });
    }
  }

  public loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
