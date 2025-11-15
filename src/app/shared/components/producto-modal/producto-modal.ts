import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../core/services/productos.service';
import { Producto } from '../../../core/interfaces/productos/producto';
import { ProductoPayload } from '../../../core/interfaces/productos/producto-payload';

@Component({
  selector: 'app-producto-modal',
  standalone: false,
  templateUrl: './producto-modal.html',
  styleUrl: './producto-modal.scss',
})
export class ProductoModal implements OnInit {
  @Input() producto: Producto | null = null;
  @Input() categoriaId!: string;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  public productoForm: FormGroup;
  public guardando: boolean = false;
  public errorMensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService
  ) {
    this.productoForm = this.fb.group({
      product_name: ['', [Validators.required, Validators.minLength(2)]],
      product_price: [0, [Validators.required, Validators.min(0)]],
      product_stock: [0, [Validators.required, Validators.min(0)]],
      product_description: [''],
      product_urlimage: [''],
      product_needpreparation: ['0', Validators.required],
      product_state: ['ACTIVO', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.producto) {
      this.productoForm.patchValue({
        product_name: this.producto.product_name,
        product_price: this.producto.product_price,
        product_stock: this.producto.product_stock,
        product_description: this.producto.product_description,
        product_urlimage: this.producto.product_urlimage,
        product_needpreparation: this.producto.product_needpreparation,
        product_state: this.producto.product_state
      });
    }
  }

  get esEdicion(): boolean {
    return this.producto !== null;
  }

  get titulo(): string {
    return this.esEdicion ? 'Editando Producto' : 'Crear Producto';
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.errorMensaje = null;

    const payload: ProductoPayload = {
      ...this.productoForm.value,
      category_id: this.categoriaId
    };

    if (this.producto) {
      payload.product_id = this.producto.product_id;
    }

    const operacion$ = this.esEdicion
      ? this.productosService.updateProducto(payload)
      : this.productosService.createProducto(payload);

    operacion$.subscribe({
      next: () => {
        this.guardado.emit();
      },
      error: (err) => {
        console.error('Error al guardar producto:', err);
        this.errorMensaje = err.message || 'Error al guardar el producto';
        this.guardando = false;
      }
    });
  }

  cerrarModal(): void {
    if (!this.guardando) {
      this.cerrar.emit();
    }
  }
}
