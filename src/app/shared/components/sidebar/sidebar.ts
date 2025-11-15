import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auth } from '../../../core/auth/services/auth';
import { UsuarioInterface } from '../../../core/interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar  {

  // 1. Recibe el estado desde el layout
  @Input() visible: boolean = false;
  
  // 2. Emite un evento 'onClose' cuando se quiere cerrar
  @Output() onClose = new EventEmitter<void>();

  
  public usuario$: Observable<UsuarioInterface | null>;

  constructor(
    private authService: Auth,
    private router: Router
  ) {
    this.usuario$ = this.authService.currentUser$;
  }

  cerrarSesion(): void {
    this.authService.logout();
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  // 3. Método que llamará el backdrop o el botón de cerrar
  close() {
    this.onClose.emit();
  }
}
