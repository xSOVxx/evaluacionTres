import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../auth/services/auth';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  // No agregar token a las rutas de autenticación
  if (request.url.includes('/login') || request.url.includes('/register')) {
    console.log("⛔ Ruta excluida del interceptor:", request.url);
    return next(request);
  }

  const authService = inject(Auth);
  const token = authService.getToken();

  console.log("⛔ interceptor ejecutado → token:", token);
  console.log("URL:", request.url);

  if (token) {
    let cloned = request.clone({
      setHeaders: {
        'Authorization': `Token token="${token}"`
      }
    });

    // Si es POST o PUT, también agregamos el token al body
    if ((request.method === 'POST' || request.method === 'PUT') && request.body) {
      const body = typeof request.body === 'object' ? request.body : {};
      cloned = cloned.clone({
        body: { ...body, token: token }
      });
    }

    return next(cloned);
  }

  return next(request);
};
