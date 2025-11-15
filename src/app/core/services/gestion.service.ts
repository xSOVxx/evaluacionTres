import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import {ApiResponseSalones} from '../interfaces/salones-mesas/api-response-salones';
import {Salon} from '../interfaces/salones-mesas/salon';
import {SalonPayload} from '../interfaces/salones-mesas/salon-payload';

import {ApiResponseMesaUnica} from '../interfaces/salones-mesas/api-response-mesa-unica';
import {ApiResponseMesas} from '../interfaces/salones-mesas/api-response-mesas';
import {Mesa} from '../interfaces/salones-mesas/mesa';
import {MesaPayload} from '../interfaces/salones-mesas/mesa-payload';
import { environment } from '../../../enviroments/environment';


@Injectable({
  providedIn: 'root',
})
export class GestionService {
  private baseUrl = environment.apiUrl.api;
  constructor(private http: HttpClient) {}


  /**
   * Endpoint 1: Obtener Salones 
   */
  getSalones(nombre: string = '', storeId: number = 1): Observable<Salon[]> {
    const url = `${this.baseUrl}/lounge/getLounges`;
    
    const body = {
      lounge_name: nombre,
      store_id: storeId
    };
    
    // Cambiado de 'http.get' a 'http.post'
    return this.http.post<ApiResponseSalones>(url, body).pipe(

      map((response) => (response.tipo === '1' ? response.data : [])),
      catchError(this.handleError)
    );
  }

  /**
   * Endpoint 2: Crear Salón
   * POST /lounge/lounge
   */
  createSalon(salonData: SalonPayload): Observable<any> {
    const url = `${this.baseUrl}/lounge/lounge`;
    // lounge_id sea null para crear
    const body = { ...salonData, lounge_id: null, store_id: 1 };
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  /**
   * Endpoint 3: Editar Salón
   * PUT /lounge/lounge 
   */
  updateSalon(salonData: SalonPayload): Observable<any> {
    const url = `${this.baseUrl}/lounge/lounge`;
    return this.http.put(url, salonData).pipe(catchError(this.handleError));
  }

  // --- 2. GESTIÓN DE MESAS (TABLEES) ---

  /**
   * Endpoint 4: Obtener Mesas por Salón
   * GET /tablee/getTableeByLoungeId/{lounge_id}/{esGestion}
   */
  getMesasPorSalon(
    lounge_id: string,
    esGestion: string = '1'
  ): Observable<Mesa[]> {
    if (!lounge_id) {
      return of([]); 
    }
    const url = `${this.baseUrl}/tablee/getTableeByLoungeId/${lounge_id}/${esGestion}`;
    return this.http.get<ApiResponseMesas>(url).pipe(
      map((response) => (response.tipo === '1' ? response.data : [])),
      catchError(this.handleError)
    );
  }

  /**
   * Endpoint 5: Obtener Mesa por ID
   * GET /tablee/tablee/{tableId}
   */
  getMesaById(tableId: string): Observable<Mesa | null> {
    const url = `${this.baseUrl}/tablee/tablee/${tableId}`;
    return this.http.get<ApiResponseMesaUnica>(url).pipe(
      map((response) => (response.tipo === '1' ? response.data : null)),
      catchError(this.handleError)
    );
  }

  /**
   * Endpoint 6: Obtener Todas las Mesas (puede no ser necesario)
   * GET /tablee/getTables
   */
  getAllMesas(): Observable<Mesa[]> {
    const url = `${this.baseUrl}/tablee/getTables`;
    return this.http.get<ApiResponseMesas>(url).pipe(
      map((response) => (response.tipo === '1' ? response.data : [])),
      catchError(this.handleError)
    );
  }

  /**
   * Endpoint 7: Actualizar Mesa
   * PUT /tablee/tablee
   */
  updateMesa(mesaData: MesaPayload): Observable<any> {
    const url = `${this.baseUrl}/tablee/tablee`;
    return this.http.put(url, mesaData).pipe(catchError(this.handleError));
  }

  // --- MANEJADOR DE ERRORES ---
  private handleError(error: HttpErrorResponse) {
    let userMessage = 'Ocurrió un error inesperado. Intente más tarde.';
    // El 'throwError' debe devolver una función
    return throwError(() => new Error(userMessage));
  }
}