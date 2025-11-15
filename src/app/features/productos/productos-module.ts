import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing-module';
import { ListaCategorias } from './pages/lista-categorias/lista-categorias';
import { DetalleCategoria } from './pages/detalle-categoria/detalle-categoria';


@NgModule({
  declarations: [
    ListaCategorias,
    DetalleCategoria
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
