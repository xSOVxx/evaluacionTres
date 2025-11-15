import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalonesRoutingModule } from './salones-routing-module';
import { ListaSalones } from './pages/lista-salones/lista-salones';
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    ListaSalones
  ],
  imports: [
    CommonModule,
    SalonesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SalonesModule { }
