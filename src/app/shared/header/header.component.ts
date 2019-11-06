import { Component, OnInit } from '@angular/core';
import { InfopaginaService } from '../../services/infopagina.service';
import { InfoPagina } from 'src/app/interfaces/info-pagina.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor( public _data:InfopaginaService,
               private _routes:Router ) { }

  ngOnInit() {

  }

  buscarProducto( termino:string ){
    if( termino.length>2 ){
        this._routes.navigate(["\search", termino]);
    }
  }

}
