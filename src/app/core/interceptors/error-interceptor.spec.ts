import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './error-interceptor';

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor]))
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle 400 Bad Request', () => {
    httpClient.get('/test').subscribe({
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.message).toContain('Datos inválidos');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush('Error', { status: 400, statusText: 'Bad Request' });
  });

  it('should handle 401 Unauthorized', () => {
    httpClient.get('/test').subscribe({
      error: (error) => {
        expect(error.status).toBe(401);
        expect(error.message).toContain('No autorizado');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush('Error', { status: 401, statusText: 'Unauthorized' });
  });

  it('should handle 404 Not Found', () => {
    httpClient.get('/test').subscribe({
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.message).toContain('no existe');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush('Error', { status: 404, statusText: 'Not Found' });
  });

  it('should handle 409 Conflict', () => {
    httpClient.get('/test').subscribe({
      error: (error) => {
        expect(error.status).toBe(409);
        expect(error.message).toContain('Conflicto');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush('Error', { status: 409, statusText: 'Conflict' });
  });

  it('should handle 500 Server Error', () => {
    httpClient.get('/test').subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.message).toContain('Error interno del servidor');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
