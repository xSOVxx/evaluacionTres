import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../auth/services/auth';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(Auth);
  const token = authService.getToken();

  console.log("⛔ interceptor ejecutado → token:", token);
  console.log("URL:", request.url);

  if (token) {
    const cloned = request.clone({
      setHeaders: {
        Authorization: token 
      }
    });
    return next(cloned);
  }

  return next(request);
};
