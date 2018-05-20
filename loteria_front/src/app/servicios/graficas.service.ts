import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class GraficasService {

  constructor(private http: Http) { }
getGrafica1(id){
  return this.http.get('http://localhost:4000/grafica1/' + id)
  .map (res => res.json());
}

getGrafica2(){
  return this.http.get('http://localhost:4000/grafica2')
  .map (res => res.json());
}
getGrafica3(id){
  return this.http.get('http://localhost:4000/grafica3/' + id)
  .map (res => res.json());
}

getGrafica4(id){
  return this.http.get('http://localhost:4000/grafica4/' + id)
  .map (res => res.json());
}
getGrafica5(){
  return this.http.get('http://localhost:4000/grafica5')
  .map (res => res.json());
}



}
