import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

import { HttpModule }    from '@angular/http';
import { Headers, Http, Response } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import {APP_BASE_HREF} from '@angular/common';

//Servicios
import { RegistrousuarioService } from './servicios/registrousuario.service';
import { ServiciologinService } from './servicios/serviciologin.service';

//Rutas
import { RouterModule, Routes}  from '@angular/router';


export const appRoutes: Routes = [
  { path:'' ,component : LoginComponent },

  { path:'carta' ,component : CartaComponent },
  { path:'baraja' ,component : BarajaComponent },
  { path:'lobby' ,component : LobbyComponent },
  { path:'chat' ,component : ChatComponent },

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
    PartidaComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    ReactiveFormsModule,HttpModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },RegistrousuarioService,ServiciologinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
