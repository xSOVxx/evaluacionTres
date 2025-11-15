import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../../interfaces/login-response';
import { environment } from '../../../../enviroments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private baseUrl = environment.baseUrl;
  private _currentUser = new BehaviorSubject<UsuarioInterface | null>(null);
  public currentUser$ = this._currentUser.asObservable();

  // --- 2. Añade esta propiedad ---
  private isBrowser: boolean; // <-- AÑADIDO

  constructor(
    private http: HttpClient,
    private router: Router,
    // --- 3. Inyecta el PLATFORM_ID ---
    @Inject(PLATFORM_ID) private platformId: Object // <-- AÑADIDO
  ) {
    // --- 4. Comprueba si estamos en el navegador ---
    this.isBrowser = isPlatformBrowser(this.platformId); // <-- AÑADIDO
    
    // Solo carga desde storage SI estamos en el navegador
    if (this.isBrowser) { // <-- AÑADIDO
      this.cargarUsuarioDesdeStorage();
    }
  }

  private cargarUsuarioDesdeStorage(): void {
    if (!this.isBrowser) return; // <-- AÑADIDO (Guardia de seguridad)
    
    const token = this.getToken();
    const user = localStorage.getItem('currentUser');
    if (token && user) {
      this._currentUser.next(JSON.parse(user));
    }
  }

  login(user_email: string, user_password: string): Observable<LoginResponse> {
    const body = { user_email, user_password };
    
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body).pipe(
      
      // --- ¡PASO DE VALIDACIÓN AÑADIDO! ---
      tap(response => {
        // 1. Revisa si el 'tipo' NO es "1" (éxito)
        if (response.tipo !== '1') {
          // 2. Si no es éxito, toma el mensaje de la API
          const errorMsg = response.mensajes[0] || 'Error de autenticación desconocido.';
          
          // 3. ¡LANZA UN ERROR MANUALMENTE!
          // Esto detendrá la cadena de RxJS y activará el bloque 'error'
          // en el 'subscribe' de tu componente.
          throw new Error(errorMsg);
        }
        // Si tipo === '1', no hace nada y continúa al siguiente 'tap'
      }),
      // --- FIN DEL PASO DE VALIDACIÓN ---

      // Esta lógica de guardado AHORA solo se ejecutará si el 'tap' de arriba pasa
      tap(response => {
        const { data } = response;
        this.guardarToken(data.token);

        const usuarioLimpio: UsuarioInterface = {
          id:     data.user_id,
          nombre: data.user_name,
          email:  data.user_email,
          rol:    data.user_rol
        };
        
        this.guardarUsuario(usuarioLimpio);
      })
    );
  }

  private guardarToken(token: string): void {
    if (this.isBrowser) { // <-- AÑADIDO
      localStorage.setItem('authToken', token);
    }
  }

  private guardarUsuario(usuario: UsuarioInterface): void {
    if (this.isBrowser) { // <-- AÑADIDO
      localStorage.setItem('currentUser', JSON.stringify(usuario));
    }
    this._currentUser.next(usuario); // (Esto es seguro, BehaviorSubject funciona en servidor)
  }

  public logout(): void {
    if (this.isBrowser) { // <-- AÑADIDO
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    }
    this._currentUser.next(null);
    this.router.navigate(['/login']);
  }

  public getToken(): string | null {
    if (this.isBrowser) { // <-- AÑADIDO
      return localStorage.getItem('authToken');
    }
    return null; // Si estamos en el servidor, no hay token
  }

  public isLoggedIn(): boolean {
    // Esto ahora funcionará de forma segura en el servidor.
    // Devolverá 'false' porque getToken() devolverá 'null'.
    return !!this.getToken();
  }
}
