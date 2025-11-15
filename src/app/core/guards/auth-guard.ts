import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../auth/services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Inyectamos el servicio y el Router
  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Le preguntamos al servicio si el usuario está logueado
    if (this.authService.isLoggedIn()) {
      return true; // Sí está logueado, déjalo pasar
    } else {
      // No está logueado, redirígelo al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}