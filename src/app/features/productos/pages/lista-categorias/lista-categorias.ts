import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, startWith, switchMap, tap } from 'rxjs';
import { ProductosService } from '../../../../core/services/productos.service';
import { Categoria } from '../../../../core/interfaces/productos/categoria';

@Component({
  selector: 'app-lista-categorias',
  standalone: false,
  templateUrl: './lista-categorias.html',
  styleUrl: './lista-categorias.scss',
})
export class ListaCategorias implements OnInit {
  
  // Observable para las categorías
  public categorias$: Observable<Categoria[]>;

  // Control de búsqueda
  public filtroBusqueda = new FormControl('');

  // Estados de carga
  public cargandoCategorias: boolean = false;

  // Modal para crear/editar categoría
  public modalVisible: boolean = false;
  public categoriaParaEditar: Categoria | null = null;

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {
    // Observable que reacciona a los cambios del buscador
    this.categorias$ = this.filtroBusqueda.valueChanges.pipe(
      startWith(''),
      tap(() => (this.cargandoCategorias = true)),
      switchMap((nombre) =>
        this.productosService.getCategorias(nombre || '', undefined, '1', '1')
      ),
      tap(() => (this.cargandoCategorias = false))
    );
  }

  ngOnInit(): void {}

  /**
   * Navegar al detalle de la categoría (lista de productos)
   */
  verDetalleCategoria(categoria: Categoria): void {
    this.router.navigate(['/productos/categoria', categoria.category_id]);
  }

  /**
   * Abrir modal para crear categoría
   */
  abrirModalCrearCategoria(): void {
    this.categoriaParaEditar = null;
    this.modalVisible = true;
  }

  /**
   * Abrir modal para editar categoría
   */
  abrirModalEditarCategoria(categoria: Categoria): void {
    this.categoriaParaEditar = { ...categoria };
    this.modalVisible = true;
  }

  /**
   * Cerrar modal
   */
  cerrarModal(): void {
    this.modalVisible = false;
  }

  /**
   * Callback cuando se guarda con éxito
   */
  onCategoriaGuardada(): void {
    this.cerrarModal();
    // Refrescar lista
    this.filtroBusqueda.setValue(this.filtroBusqueda.value);
  }
}

