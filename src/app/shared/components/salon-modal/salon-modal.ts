import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Salon } from '../../../core/interfaces/salones-mesas/salon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionService } from '../../../core/services/gestion.service';
import { SalonPayload } from '../../../core/interfaces/salones-mesas/salon-payload';

@Component({
  selector: 'app-salon-modal',
  standalone: false,
  templateUrl: './salon-modal.html',
  styleUrl: './salon-modal.scss',
})
export class SalonModal implements OnChanges {
  // --- Entradas y Salidas ---
  @Input() visible: boolean = false;
  @Input() salon: Salon | null = null; // null = Crear, Objeto = Editar
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>(); // Notifica al padre que se guardó

  // --- Estado Interno ---
  public salonForm: FormGroup;
  public isEditMode: boolean = false;
  public isSaving: boolean = false;
  public errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private gestionService: GestionService
  ) {
    // Inicializamos el formulario
    this.salonForm = this.fb.group({
      lounge_name: ['', [Validators.required]],
      cantidad_mesas: [0, [Validators.required, Validators.min(0)]],
      lounge_state: ['ACTIVO', [Validators.required]], // Valor por defecto
    });
  }

  /**
   * Detecta cuando el @Input() 'salon' cambia.
   * (Esto es mejor que ngOnInit para un modal reutilizable)
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['salon'] && this.salon) {
      // --- Modo Editar ---
      this.isEditMode = true;
      this.salonForm.patchValue({
        lounge_name: this.salon.lounge_name,
        cantidad_mesas: this.salon.cantidad_mesas,
        lounge_state: this.salon.lounge_state,
      });
    } else if (changes['visible'] && this.visible && !this.salon) {
      // --- Modo Crear ---
      this.isEditMode = false;
      this.resetForm();
    }
  }

  /**
   * Limpia el formulario a sus valores por defecto
   */
  private resetForm(): void {
    this.salonForm.reset({
      lounge_name: '',
      cantidad_mesas: 0,
      lounge_state: 'ACTIVO',
    });
    this.errorMessage = null;
    this.isSaving = false;
  }

  /**
   * Método principal que se llama al guardar
   */
  guardarSalon(): void {
    if (this.salonForm.invalid) {
      this.salonForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = null;

    // Preparamos el payload (datos a enviar)
    const formValue = this.salonForm.value;
    const payload: SalonPayload = {
      lounge_name: formValue.lounge_name,
      cantidad_mesas: Number(formValue.cantidad_mesas),
      lounge_state: formValue.lounge_state,
      store_id: 1, // Fijo, según tu especificación
    };

    // Decidimos si crear o editar
    if (this.isEditMode && this.salon) {
      // --- Lógica de Edición ---
      payload.lounge_id = this.salon.lounge_id;
      this.gestionService.updateSalon(payload).subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err),
      });
    } else {
      // --- Lógica de Creación ---
      this.gestionService.createSalon(payload).subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err),
      });
    }
  }

  /**
   * Se llama cuando la API responde OK
   */
  private handleSuccess(): void {
    this.isSaving = false;
    this.onSave.emit(); // Notifica al padre
  }

  /**
   * Se llama cuando la API da un error
   */
  private handleError(error: Error): void {
    this.isSaving = false;
    this.errorMessage = error.message; // Muestra el error amigable
  }

  /**
   * Emite el evento para cerrar el modal
   */
  close(): void {
    this.resetForm();
    this.onClose.emit();
  }
}
