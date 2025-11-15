import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Layout } from './components/layout/layout';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';
import { SalonModal } from './components/salon-modal/salon-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteModal } from './components/cliente-modal/cliente-modal';




@NgModule({
  declarations: [
    Layout,
    Navbar,
    Sidebar,
    SalonModal,
    ClienteModal
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule

  ],
  exports: [
    Layout,
    Navbar,
    Sidebar,
    SalonModal,
    ClienteModal
  ]
})
export class SharedModule { }
