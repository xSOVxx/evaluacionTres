import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      switch (error.status) {
        case 400:
          errorMessage = '❌ Datos inválidos, revisa el formulario';
          console.error('Bad Request:', error.error);
          break;

        case 401:
          errorMessage = '🔒 No autorizado. Tu sesión ha expirado';
          console.error('Unauthorized:', error.error);
          // Limpiar token y redirigir al login
          localStorage.removeItem('token');
          router.navigate(['/auth/login']);
          break;

        case 404:
          errorMessage = '🔍 Este recurso no existe';
          console.error('Not Found:', error.error);
          break;

        case 409:
          errorMessage = '⚠️ Conflicto: ya existe un registro con esos datos';
          console.error('Conflict:', error.error);
          break;

        case 500:
          errorMessage = '🔥 Error interno del servidor. Intenta más tarde';
          console.error('Server Error:', error.error);
          break;

        case 503:
          errorMessage = '🚧 Servicio no disponible. Intenta más tarde';
          console.error('Service Unavailable:', error.error);
          break;

        default:
          errorMessage = `⚠️ Error inesperado (${error.status})`;
          console.error('Error desconocido:', error);
      }

      // Mostrar mensaje en consola para debugging
      console.error(`[HTTP Error ${error.status}]:`, errorMessage);

      // Mostrar alerta al usuario (puedes reemplazar con un servicio de notificaciones)
      if (error.status !== 401) { // No mostrar alerta para 401, ya redirige
        alert(errorMessage);
      }

      // Re-lanzar el error para que los componentes puedan manejarlo si lo necesitan
      return throwError(() => ({
        status: error.status,
        message: errorMessage,
        originalError: error
      }));
    })
  );
};
