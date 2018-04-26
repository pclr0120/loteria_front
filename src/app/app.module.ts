import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { SalaComponent } from './sala/sala.component';

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
  { path:'sala' ,component : SalaComponent },
  
  
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    SalaComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    ReactiveFormsModule,HttpModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },RegistrousuarioService,ServiciologinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
