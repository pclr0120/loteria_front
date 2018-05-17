import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class SalasService {

  constructor(private http:Http) { }
  presURL = 'http://localhost:4000/';

getNuevaPartida(){
  return this.http.get(this.presURL).map(res => res.json())
  .toPromise()
  .then(data => { return data; });
}
getSalaNombre(nombre$: string){
  const url = 'http://localhost:4000/sala/' + nombre$;
  return this.http.get(url)
  .map(res => res.json());
}

getObtenerNumSala(){
  return this.http.get('http://localhost:4000/salasContar')
  .map(res =>     
 res.json());

}

getSalas(){
  return this.http.get(this.presURL+'getSalas')
    .map(res=>res.json());
}

postNuevaPartida(sala: any) {
  const newpres = JSON.stringify(sala);
  const headers = new Headers({ 'Content-Type': 'Application/json' });
  return this.http.post(this.presURL + 'salas', newpres, { headers })

    .map(res => {

      console.log(res.json());
      return res.json();

    })

}

}


