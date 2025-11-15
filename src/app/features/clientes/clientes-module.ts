import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing-module';
import { ListaClientes } from './pages/lista-clientes/lista-clientes';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    ListaClientes
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClientesModule { }
