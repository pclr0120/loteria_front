import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ServiciologinService {

  public Cliente;
  public identity;
  constructor(private http: Http) { }

  

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('Identity'))
    if (identity != "Undefined" ) {
      this.identity = identity;
    }
    else
    {
      this.identity= null
    }
     return this.identity
  }


  signup(usuario_to_login) {
    const newpres = JSON.stringify(usuario_to_login);
    const headers = new Headers({ 'Content-Type': 'Application/json' });
    return this.http.post('http://localhost:4000/usuario/login', newpres, { headers })
      .map(res =>
        res.json()
      )

  }

 
}
