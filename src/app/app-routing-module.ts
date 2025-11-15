import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './shared/components/layout/layout';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
  },

  {
    path: '',
    component: Layout, 
    canActivate: [ AuthGuard ],  
    children: [
      {
        path: 'salones',
        loadChildren: () => import('./features/salones/salones-module').then(m => m.SalonesModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('./features/productos/productos-module').then(m => m.ProductosModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./features/clientes/clientes-module').then(m => m.ClientesModule)
      },
      {
        path: '',
        redirectTo: 'salones', 
        pathMatch: 'full'
      }
    ]
  },


  { 
    path: '**', 
    redirectTo: 'login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
