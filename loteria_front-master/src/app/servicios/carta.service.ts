import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CartaService {

  constructor(private http:Http) { }
  //presURL = 'http://localhost:4000/';
  presURL = 'http://ec2-18-188-74-192.us-east-2.compute.amazonaws.com:3000/';

  getCarta(idCarta){
    return this.http.get(this.presURL+'carta/'+idCarta)
      .map(res=>res.json());
  }

}
