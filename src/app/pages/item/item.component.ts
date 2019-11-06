import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDetalle } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto:ProductoDetalle;
  codigoProducto:string = "";

  constructor( private _route:ActivatedRoute,
               public _productosServicios:ProductosService ) { }

  ngOnInit() {

    this._route.params
                .subscribe(parametros => {

                    this.codigoProducto = parametros.id;

                    this._productosServicios.cargarProductoDetalle(parametros.id)
                                  .subscribe( ( productoDetalle:ProductoDetalle ) => {
                                      //console.log(productoDetalle);
                                      this.producto = productoDetalle;
                                  });
                })
  }

}
