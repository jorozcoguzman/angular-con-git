import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfopaginaService {

  info:InfoPagina = {};
  equipo:any[] = [];
  cargada = false;

  constructor( private http:HttpClient) {

    this.CargarInfo();
    this.CargarEquipo();

  }

  private CargarInfo(){

    this.http.get("assets/data/data-pagina.json")
                .subscribe( ( resp:InfoPagina ) => {
                  console.log(resp);
                  this.cargada=true;
                  this.info = resp;
                });
  }

  private CargarEquipo(){

    this.http.get("https://angular-http-1846f.firebaseio.com/equipo.json")
                .subscribe( ( resp:any[] ) => {
                  console.log(resp);
                  this.equipo = resp;
                });

  }
}
