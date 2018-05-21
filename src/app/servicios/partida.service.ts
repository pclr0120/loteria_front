import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PartidaService {

  constructor(private http:Http) { }
  getObtenerNumPartida(){
    return this.http.get('http://localhost:4000/partidasContar')
    .map(res =>     
   res.json());
  
  }


postNuevaPartida(sala: any) {
  const newpres = JSON.stringify(sala);
  const headers = new Headers({ 'Content-Type': 'Application/json' });
  return this.http.post('http://localhost:4000/partidas', newpres, { headers })

    .map(res => {

      console.log(res.json());
      return res.json();

    })

}

}
