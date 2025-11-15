import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Layout } from './components/layout/layout';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';




@NgModule({
  declarations: [
    Layout,
    Navbar,
    Sidebar
  ],
  imports: [
    CommonModule,
    RouterModule,

  ],
  exports: [
    Layout,
    Navbar,
    Sidebar,

  ]
})
export class SharedModule { }
