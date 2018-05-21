import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { SalaComponent } from './sala/sala.component';
import { MenuJugadasComponent } from './menu-jugadas/menu-jugadas.component';
import { CartaComponent } from './carta/carta.component';
import { BarajaComponent } from './baraja/baraja.component';
import { LobbyComponent } from './lobby/lobby.component';
import { PartidaComponent } from './partida/partida.component';
import { ChatComponent } from './chat/chat.component';
import { NuevapartidaComponent } from './nuevapartida/nuevapartida.component';
import { JugadasComponent } from './jugadas/jugadas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

import { HttpModule }    from '@angular/http';
import { Headers, Http, Response } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import {APP_BASE_HREF} from '@angular/common';

//Servicios
import { RegistrousuarioService } from './servicios/registrousuario.service';
import { ServiciologinService } from './servicios/serviciologin.service';
import { SalasService } from './servicios/salas.service';
import { PartidaService } from './servicios/partida.service';
import { GraficasService } from './servicios/graficas.service';


//Rutas
import { RouterModule, Routes}  from '@angular/router';
import { GanadoresService } from './servicios/ganadores.service';
import { Grafica1Component } from './grafica1/grafica1.component';
import { Grafica2Component } from './grafica2/grafica2.component';
import { Grafica3Component } from './grafica3/grafica3.component';
import { Grafica4Component } from './grafica4/grafica4.component';
import { Grafica5Component } from './grafica5/grafica5.component';


export const appRoutes: Routes = [

  { path:'' ,component : LoginComponent },
  { path:'lobby' ,component : LobbyComponent },
  { path:'nuevapartida' ,component : NuevapartidaComponent },
  { path:'partida' ,component : PartidaComponent },
  { path:'estadisticas' ,component : EstadisticasComponent },
  { path:'grafica2' ,component : Grafica2Component },
  { path:'grafica3', component : Grafica3Component},
  { path:'grafica4', component: Grafica4Component},
  { path:'grafica5', component: Grafica5Component},
  
  {path : 'jugadas/:id', component: JugadasComponent},
  

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    SalaComponent,
    MenuJugadasComponent,
    CartaComponent,
    BarajaComponent,
    LobbyComponent,
    NuevapartidaComponent,
    PartidaComponent,
    ChatComponent,
    JugadasComponent,
    EstadisticasComponent,
    Grafica1Component,
    Grafica2Component,
    Grafica3Component,
    Grafica4Component,
    Grafica5Component
  ],
  imports: [
    BrowserModule, FormsModule,
    ReactiveFormsModule,HttpModule, RouterModule.forRoot(appRoutes), ChartsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },PartidaService,GraficasService,RegistrousuarioService,ServiciologinService, SalasService, GanadoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
