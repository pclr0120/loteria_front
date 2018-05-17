import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class GraficasService {

  constructor(private http: Http) { }
getGrafica1(){
  return this.http.get('http://localhost:4000/grafica1')
  .map (res => res.json());
}
}
