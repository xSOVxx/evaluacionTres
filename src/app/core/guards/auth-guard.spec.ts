import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../auth/services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(Auth); // Inyecta el AuthService (singleton)
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Si está logueado, déjalo pasar
  }
  
  // Si no, lo botamos al login
  router.navigate(['/login']);
  return false;
};