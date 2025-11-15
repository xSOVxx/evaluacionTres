import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalonesModule } from './salones-module';
import { ListaSalones } from './pages/lista-salones/lista-salones';

const routes: Routes = [
  {path: '', component: ListaSalones }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalonesRoutingModule { }
