import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando_idx = true;
  urlPrincipal:string = "https://angular-http-1846f.firebaseio.com/";
  productos_idx:Producto[] = [];
  productosBuscar:Producto[] = [];


  constructor( private http:HttpClient) { 

      this.cargarProductosIDX();
  }

  public cargarProductoDetalle(codProducto:string){

    return this.http.get(this.urlPrincipal + `productos/${codProducto}.json`);
  }

  private cargarProductosIDX(){

    //llamar funcion si      bien   ,  mal
    return new Promise(  ( resolve, reject ) => {

            this.http.get(this.urlPrincipal + "productos_idx.json")
                        .subscribe( ( resp:Producto[] ) => {
                          
                            this.productos_idx = resp;
                            this.cargando_idx = false;
                            resolve();
                        })
    });
  }

  public buscarProductos( termino:string ){

      if(this.productos_idx.length === 0){

        this.cargarProductosIDX().then( () => {
                    this.cargaFiltro( termino );
                  });
      }else{

          this.cargaFiltro( termino );
      }
  }


  public cargaFiltro( termino:string ){

      /*
      this.productosBuscar = this.productos_idx.filter( producto => {
        return true;
      })
      */

      this.productosBuscar = [];

      termino = termino.toLocaleLowerCase();

      this.productos_idx.forEach( prod => {

          if( prod.categoria.toLocaleLowerCase().indexOf( termino ) > -1 || 
              prod.titulo.toLocaleLowerCase().indexOf( termino ) > -1 ){

              this.productosBuscar.push( prod );
          }
      });
  }
}
