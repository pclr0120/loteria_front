import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class RegistrousuarioService {

  constructor(private http:Http) { }
 // presURL = 'http://localhost:4000/usuarios';
 presURL = 'http://ec2-18-188-74-192.us-east-2.compute.amazonaws.com:3000/usuarios';
  getUser(){
    return this.http.get(this.presURL).map(res => res.json())
    .toPromise()
    .then(data => { return data; });
  }

  getObtenerNumUser(){
    //return this.http.get('http://localhost:4000/usuariosContar')
    return this.http.get('http://ec2-18-188-74-192.us-east-2.compute.amazonaws.com:3000/usuariosContar')
    .map(res => res.json());
  }

  updateCash(idUsuario: any, cash: any) {
    //var URL = 'http://localhost:4000/updatecash';
    var URL = 'http://ec2-18-188-74-192.us-east-2.compute.amazonaws.com:3000/updatecash';
    const newpres = {
      "idUsuario": idUsuario,
      "cash": cash
    }
    const headers = new Headers({ 'Content-Type': 'Application/json' });
    return this.http.put(URL, newpres, { headers })
    .map(res => {
      console.log(res.json());
      return res.json();
    })
  }

  postUser(user: any) {
    const newpres = JSON.stringify(user);
    console.log(user)
    const headers = new Headers({ 'Content-Type': 'Application/json' });
    return this.http.post(this.presURL, newpres, { headers })

      .map(res => {

        console.log(res.json());
        return res.json();

      })

  }

}


