import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing-module';
import { ListaClientes } from './pages/lista-clientes/lista-clientes';


@NgModule({
  declarations: [
    ListaClientes
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
