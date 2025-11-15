import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductosRoutingModule } from './productos-routing-module';
import { ListaCategorias } from './pages/lista-categorias/lista-categorias';
import { DetalleCategoria } from './pages/detalle-categoria/detalle-categoria';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    ListaCategorias,
    DetalleCategoria
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
