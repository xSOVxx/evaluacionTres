import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCategorias } from './pages/lista-categorias/lista-categorias';
import { DetalleCategoria } from './pages/detalle-categoria/detalle-categoria';

const routes: Routes = [
  {
    path: '',
    component: ListaCategorias
  },
  {
    path: 'categoria/:id',
    component: DetalleCategoria
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
