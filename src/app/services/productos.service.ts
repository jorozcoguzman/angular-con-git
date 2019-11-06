import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando_idx = true;
  cargando_detalle = true;
  urlPrincipal:string = "https://angular-http-1846f.firebaseio.com/";
  productos_detalle:any[] = [];
  productos_idx:Producto[] = [];


  constructor( private http:HttpClient) { 

    this.cargarProductos();
    this.cargarProductosIDX();

  }

  private cargarProductos(){
    this.http.get(this.urlPrincipal + "productos.json")
                  .subscribe( ( resp:any[] ) => {
                    console.log(resp);
                    this.productos_detalle = resp;
                    this.cargando_detalle = false;
                  })
  }

  private cargarProductosIDX(){
    this.http.get(this.urlPrincipal + "productos_idx.json")
                  .subscribe( ( resp:Producto[] ) => {
                    console.log(resp);
                    this.productos_idx = resp;

                    setTimeout(() => {
                      this.cargando_idx = false;
                    }, 2000);
                  })
  }
}
