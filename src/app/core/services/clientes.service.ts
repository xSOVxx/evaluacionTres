import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ApiResponseClientes } from '../interfaces/clientes/api-response-clientes';
import { Cliente } from '../interfaces/clientes/cliente';
import { ClientePayload } from '../interfaces/clientes/cliente-payload';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private baseUrl = 'https://pidemesa.orealy.xyz/api/rest/customer'; 

  constructor(private http: HttpClient) { }

  /**

   */
  getCustomers(searchQuery: string = '', status: string = 'Todos'): Observable<Cliente[]> {
    const url = `${this.baseUrl}/getCustomers`;

      console.log("TOKEN ENVIADO:", localStorage.getItem('authToken'));

    
    //  filtro en el body como un POST
    const body = {
      search_query: searchQuery, // parámetro para el buscador
      status: status // Activo/Inactivo/Todos
    };
    
    return this.http.post<ApiResponseClientes>(url, body).pipe(
      map(response => (response && response.tipo === '1') ? response.data : []),
      catchError(this.handleError)
    );
  }

  createCliente(payload: ClientePayload): Observable<any> {
    const url = `${this.baseUrl}/customer`;
    const body = { ...payload, customer_id: null, customer_state: '1' };
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  /**
   *
   */
  updateCliente(payload: ClientePayload): Observable<any> {
    const url = `${this.baseUrl}/customer`;
    return this.http.put(url, payload).pipe(catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {
    let userMessage = 'Error al procesar la solicitud.';
    if (error.status === 400) {
      userMessage = 'Datos inválidos. Verifica los campos.';
    }
    return throwError(() => new Error(userMessage));
  }
}