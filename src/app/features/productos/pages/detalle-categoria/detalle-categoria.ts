import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, startWith, switchMap, tap, of, combineLatest } from 'rxjs';
import { ProductosService } from '../../../../core/services/productos.service';
import { Producto } from '../../../../core/interfaces/productos/producto';
import { Categoria } from '../../../../core/interfaces/productos/categoria';

@Component({
  selector: 'app-detalle-categoria',
  standalone: false,
  templateUrl: './detalle-categoria.html',
  styleUrl: './detalle-categoria.scss',
})
export class DetalleCategoria implements OnInit {
  
  // Datos de la categoría actual
  public categoria: Categoria | null = null;
  public categoriaId: string = '';

  // Observable de productos
  public productos$: Observable<Producto[]>;

  // Subcategorías (si existen)
  public subcategorias$: Observable<Categoria[]>;

  // Control de búsqueda
  public filtroBusqueda = new FormControl('');

  // Estados de carga
  public cargandoProductos: boolean = false;
  public cargandoSubcategorias: boolean = false;

  // Modales
  public modalProductoVisible: boolean = false;
  public modalSubcategoriaVisible: boolean = false;
  public productoParaEditar: Producto | null = null;
  public subcategoriaParaEditar: Categoria | null = null;

  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Obtener productos filtrados por categoría
    this.productos$ = combineLatest([
      this.route.params,
      this.filtroBusqueda.valueChanges.pipe(startWith(''))
    ]).pipe(
      tap(() => (this.cargandoProductos = true)),
      switchMap(([params, busqueda]) => {
        this.categoriaId = params['id'];
        return this.productosService.getProductos(
          busqueda || '',
          undefined,
          this.categoriaId
        );
      }),
      tap(() => (this.cargandoProductos = false))
    );

    // Obtener subcategorías
    this.subcategorias$ = this.route.params.pipe(
      tap(() => (this.cargandoSubcategorias = true)),
      switchMap((params) => {
        return this.productosService.getCategorias(
          '',
          Number(params['id']),
          '1',
          '0' // isPadre = 0 para obtener subcategorías
        );
      }),
      tap(() => (this.cargandoSubcategorias = false))
    );
  }

  ngOnInit(): void {
    // Obtener información de la categoría actual
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      this.productosService.getCategoriaById(id).subscribe({
        next: (cat) => {
          this.categoria = cat;
        },
        error: (err) => {
          console.error('Error al cargar categoría:', err);
        }
      });
    });
  }

  /**
   * Volver a la lista de categorías
   */
  volver(): void {
    this.router.navigate(['/productos']);
  }

  /**
   * Ver productos de una subcategoría
   */
  verSubcategoria(subcategoria: Categoria): void {
    this.router.navigate(['/productos/categoria', subcategoria.category_id]);
  }

  /**
   * Abrir modal para crear producto
   */
  abrirModalCrearProducto(): void {
    this.productoParaEditar = null;
    this.modalProductoVisible = true;
  }

  /**
   * Abrir modal para editar producto
   */
  abrirModalEditarProducto(producto: Producto): void {
    this.productoParaEditar = { ...producto };
    this.modalProductoVisible = true;
  }

  /**
   * Abrir modal para editar la categoría actual
   */
  abrirModalEditarCategoria(categoria: Categoria): void {
    // Por ahora solo console, implementar modal después
    console.log('Editar categoría:', categoria);
  }

  /**
   * Abrir modal para crear subcategoría
   */
  abrirModalCrearSubcategoria(): void {
    this.subcategoriaParaEditar = null;
    this.modalSubcategoriaVisible = true;
  }

  /**
   * Abrir modal para editar subcategoría
   */
  abrirModalEditarSubcategoria(subcategoria: Categoria): void {
    this.subcategoriaParaEditar = { ...subcategoria };
    this.modalSubcategoriaVisible = true;
  }

  /**
   * Cerrar modales
   */
  cerrarModalProducto(): void {
    this.modalProductoVisible = false;
  }

  cerrarModalSubcategoria(): void {
    this.modalSubcategoriaVisible = false;
  }

  /**
   * Callbacks de guardado
   */
  onProductoGuardado(): void {
    this.cerrarModalProducto();
    this.filtroBusqueda.setValue(this.filtroBusqueda.value);
  }

  onSubcategoriaGuardada(): void {
    this.cerrarModalSubcategoria();
    // Refrescar subcategorías (se hace automático por el observable)
  }
}

