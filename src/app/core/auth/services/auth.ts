import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../../interfaces/login-response';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private baseUrl = environment.apiUrl.auth;
  private isBrowser: boolean;

  private _currentUser = new BehaviorSubject<UsuarioInterface | null>(null);
  public currentUser$ = this._currentUser.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.cargarUsuarioDesdeStorage();
  }

  // --- LOCALSTORAGE SEGURO ---
  private setItem(key: string, value: string): void {
    if (this.isBrowser) localStorage.setItem(key, value);
  }

  private getItem(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }

  private removeItem(key: string): void {
    if (this.isBrowser) localStorage.removeItem(key);
  }

  private cargarUsuarioDesdeStorage(): void {
    const token = this.getItem('authToken');
    const user = this.getItem('currentUser');

    if (token && user) {
      this._currentUser.next(JSON.parse(user));
    }
  }

  // --- LOGIN ---
  login(user_email: string, user_password: string): Observable<LoginResponse> {

    const body = { user_email, user_password };

    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body).pipe(
      tap(response => {
        
        // Validación
        if (response.tipo !== '1') {
          throw new Error(response.mensajes[0] || 'Error de autenticación');
        }

        // ✔ Token viene dentro de data
        const token = response.data.token;
        console.log('🔑 Token recibido del login:', token);
        this.guardarToken(token);

        // ✔ Usuario simplificado según tu interface
        const usuarioLimpio: UsuarioInterface = {
          id: Number(response.data.user_id),
          nombre: response.data.user_name,
          email: response.data.user_email,
          rol: response.data.user_rol
        };

        this.guardarUsuario(usuarioLimpio);
      })
    );
  }

  private guardarToken(token: string): void {
    console.log('💾 Guardando token en localStorage:', token);
    this.setItem('authToken', token);
  }

  private guardarUsuario(usuario: UsuarioInterface): void {
    this.setItem('currentUser', JSON.stringify(usuario));
    this._currentUser.next(usuario);
  }

  // --- LOGOUT ---
  public logout(): void {
    this.removeItem('authToken');
    this.removeItem('currentUser');
    this._currentUser.next(null);
    this.router.navigate(['/login']);
  }

  public getToken(): string | null {
    const token = this.getItem('authToken');
    console.log('🔍 Token recuperado de localStorage:', token);
    return token;
  }

  public isLoggedIn(): boolean {
  return !!this._currentUser.getValue();
}

}
