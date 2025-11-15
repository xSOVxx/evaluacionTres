import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Categoria } from '../interfaces/productos/categoria';
import { CategoriaPayload } from '../interfaces/productos/categoria-payload';
import { ApiResponseCategorias } from '../interfaces/productos/api-response-categorias';
import { ApiResponseCategoriaUnica } from '../interfaces/productos/api-response-categoria-unica';
import { Producto } from '../interfaces/productos/producto';
import { ProductoPayload } from '../interfaces/productos/producto-payload';
import { ApiResponseProductos } from '../interfaces/productos/api-response-productos';
import { ApiResponseProductoUnico } from '../interfaces/productos/api-response-producto-unico';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  private baseUrl = environment.apiUrl.api;

  constructor(private http: HttpClient) { }

  getCategorias(
    category_name: string = '',
    category_categoryid?: number,
    isGestion: string = '1',
    isPadre: string = '1'
  ): Observable<Categoria[]> {
    const url = `${this.baseUrl}/category/getCategories`;
    
    const body: any = {
      category_name,
      isGestion,
      isPadre
    };

    // Solo agregar category_categoryid si está definido
    if (category_categoryid !== undefined) {
      body.category_categoryid = category_categoryid;
    }
    
    return this.http.post<ApiResponseCategorias>(url, body).pipe(
      map((response) => (response.tipo === '1' ? response.data : [])),
      catchError(this.handleError)
    );
  }

  getCategoriaById(category_id: number): Observable<Categoria | null> {
    const url = `${this.baseUrl}/category/category/${category_id}`;
    return this.http.get<ApiResponseCategoriaUnica>(url).pipe(
      map((response) => (response.tipo === '1' ? response.data : null)),
      catchError(this.handleError)
    );
  }

  createCategoria(categoriaData: CategoriaPayload): Observable<any> {
    const url = `${this.baseUrl}/category/category`;
    const body = { ...categoriaData, category_id: null };
    return this.http.post(url, body).pipe(
      catchError(this.handleError)
    );
  }

  updateCategoria(categoriaData: CategoriaPayload): Observable<any> {
    const url = `${this.baseUrl}/category/category`;
    return this.http.put(url, categoriaData).pipe(
      catchError(this.handleError)
    );
  }

  getProductos(
    product_name: string = '',
    product_categoryid?: string,
    category_id?: string,
    category_name?: string,
    subcategory_id?: string,
    subcategory_name?: string
  ): Observable<Producto[]> {
    const url = `${this.baseUrl}/product/getProducts`;
    
    const body: any = {
      product_name
    };

    if (product_categoryid) body.product_categoryid = product_categoryid;
    if (category_id) body.category_id = category_id;
    if (category_name) body.category_name = category_name;
    if (subcategory_id) body.subcategory_id = subcategory_id;
    if (subcategory_name) body.subcategory_name = subcategory_name;
    
    return this.http.post<ApiResponseProductos>(url, body).pipe(
      map((response) => (response.tipo === '1' ? response.data : [])),
      catchError(this.handleError)
    );
  }

  createProducto(productoData: ProductoPayload): Observable<any> {
    const url = `${this.baseUrl}/product/product`;
    const body = { ...productoData, product_id: null };
    return this.http.post(url, body).pipe(
      catchError(this.handleError)
    );
  }

  updateProducto(productoData: ProductoPayload): Observable<any> {
    const url = `${this.baseUrl}/product/product`;
    return this.http.put(url, productoData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let userMessage = 'Ocurrió un error inesperado. Intente más tarde.';
    
    if (error.error?.mensajes && error.error.mensajes.length > 0) {
      userMessage = error.error.mensajes[0];
    }
    
    return throwError(() => new Error(userMessage));
  }
}
