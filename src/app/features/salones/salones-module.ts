import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalonesRoutingModule } from './salones-routing-module';
import { ListaSalones } from './pages/lista-salones/lista-salones';


@NgModule({
  declarations: [
    ListaSalones
  ],
  imports: [
    CommonModule,
    SalonesRoutingModule
  ]
})
export class SalonesModule { }
