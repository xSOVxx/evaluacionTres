import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Layout } from './components/layout/layout';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';
import { SalonModal } from './components/salon-modal/salon-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteModal } from './components/cliente-modal/cliente-modal';
import { CategoriaModal } from './components/categoria-modal/categoria-modal';
import { ProductoModal } from './components/producto-modal/producto-modal';




@NgModule({
  declarations: [
    Layout,
    Navbar,
    Sidebar,
    SalonModal,
    ClienteModal,
    CategoriaModal,
    ProductoModal
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
    ClienteModal,
    CategoriaModal,
    ProductoModal
  ]
})
export class SharedModule { }
