import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../core/services/productos.service';
import { Categoria } from '../../../core/interfaces/productos/categoria';
import { CategoriaPayload } from '../../../core/interfaces/productos/categoria-payload';

@Component({
  selector: 'app-categoria-modal',
  standalone: false,
  templateUrl: './categoria-modal.html',
  styleUrl: './categoria-modal.scss',
})
export class CategoriaModal implements OnInit {
  @Input() categoria: Categoria | null = null; // null = crear, objeto = editar
  @Input() categoriaParentId: string | null = null; // Para subcategorías
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  public categoriaForm: FormGroup;
  public guardando: boolean = false;
  public errorMensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService
  ) {
    this.categoriaForm = this.fb.group({
      category_name: ['', [Validators.required, Validators.minLength(2)]],
      category_urlimage: [''],
      category_state: ['ACTIVO', Validators.required]
    });
  }

  ngOnInit(): void {
    // Si estamos editando, llenar el formulario
    if (this.categoria) {
      this.categoriaForm.patchValue({
        category_name: this.categoria.category_name,
        category_urlimage: this.categoria.category_urlimage,
        category_state: this.categoria.category_state
      });
    }
  }

  get esEdicion(): boolean {
    return this.categoria !== null;
  }

  get esSubcategoria(): boolean {
    return this.categoriaParentId !== null;
  }

  get titulo(): string {
    if (this.esEdicion) {
      return this.esSubcategoria ? 'Editar subcategoría' : 'Editar categoría';
    }
    return this.esSubcategoria ? 'Crear subcategoría' : 'Crear categoría';
  }

  onSubmit(): void {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.errorMensaje = null;

    const payload: CategoriaPayload = {
      ...this.categoriaForm.value,
      category_categoryid: this.categoriaParentId ? Number(this.categoriaParentId) : 0
    };

    // Si es edición, agregar el ID
    if (this.categoria) {
      payload.category_id = this.categoria.category_id;
    }

    const operacion$ = this.esEdicion
      ? this.productosService.updateCategoria(payload)
      : this.productosService.createCategoria(payload);

    operacion$.subscribe({
      next: () => {
        this.guardado.emit();
      },
      error: (err) => {
        console.error('Error al guardar categoría:', err);
        this.errorMensaje = err.message || 'Error al guardar la categoría';
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
