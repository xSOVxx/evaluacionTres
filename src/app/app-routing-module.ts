import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './shared/components/layout/layout';
import { AuthGuard } from './core/guards/auth-guard';

const routes: Routes = [
  // --- RUTA PÚBLICA: LOGIN ---
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
  },

  // --- RUTAS PRIVADAS (Protegidas por el Guard) ---
  {
    path: '', // La raíz de la app ('/')
    component: Layout, // Carga el Layout (Navbar/Sidebar)
    canActivate: [ AuthGuard ],  // ¡Usa el guardián para protegerlas!
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
      // ... (Aquí irán 'clientes', 'usuarios' cuando los actives)
      
      // --- Ruta por defecto (si estás logueado y vas a '/') ---
      {
        path: '',
        redirectTo: 'salones', // Te redirige a la página principal de tu app
        pathMatch: 'full'
      }
    ]
  },

  // --- RUTA COMODÍN (Catch-all) ---
  // Si la URL no coincide con nada, redirige a 'login'
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
