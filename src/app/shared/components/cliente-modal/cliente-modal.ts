import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClientePayload } from '../../../core/interfaces/clientes/cliente-payload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../core/services/clientes.service';
import { Cliente } from '../../../core/interfaces/clientes/cliente';

@Component({
  selector: 'app-cliente-modal',
  standalone: false,
  templateUrl: './cliente-modal.html',
  styleUrl: './cliente-modal.scss',
})
export class ClienteModal implements OnChanges {
  
  // --- Entradas y Salidas ---
  @Input() visible: boolean = false;
  @Input() cliente: Cliente | null = null; 
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();

  // --- Estado Interno ---
  public clienteForm: FormGroup;
  public isEditMode: boolean = false;
  public isSaving: boolean = false;
  public errorMessage: string | null = null;
  public documentTypes = [
    { label: 'DNI', value: '1' },
    { label: 'RUC', value: '2' }
  ];

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.clienteForm = this.fb.group({
      customer_name: ['', [Validators.required]],
      customer_email: ['', [Validators.required, Validators.email]],
      customer_phone: ['', [Validators.required]],
      customer_typedocument: ['1', [Validators.required]],
      customer_numberdocument: ['', [Validators.required, Validators.maxLength(11)]],
      customer_address: ['', [Validators.required]],
      customer_country: ['PERÚ', [Validators.required]], // Asumiendo valor por defecto
      customer_birthdate: [''], // Opcional
      customer_state: ['1'], // 1: Activo (solo se usa en edición para cambiar)
    });
  }

  /**
   * Carga los datos del cliente cuando se pasa un objeto (Modo Editar)
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente'] && this.cliente) {
      this.isEditMode = true;
      this.clienteForm.patchValue(this.cliente);
    } else if (changes['visible'] && this.visible && !this.cliente) {
      this.isEditMode = false;
      this.resetForm();
    }
  }

  /**
   * Método principal para crear o editar
   */
  guardarCliente(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = null;

    const payload: ClientePayload = {
      ...this.clienteForm.value,
      customer_id: this.isEditMode ? this.cliente?.customer_id : undefined,
    };

    const serviceCall = this.isEditMode
      ? this.clienteService.updateCliente(payload)
      : this.clienteService.createCliente(payload);

    serviceCall.subscribe({
      next: () => this.handleSuccess(),
      error: (err) => this.handleError(err),
    });
  }

  private handleSuccess(): void {
    this.isSaving = false;
    this.onSave.emit();
    this.resetForm();
  }

  private handleError(error: Error): void {
    this.isSaving = false;
    this.errorMessage = error.message;
  }

  resetForm(): void {
    this.clienteForm.reset({ customer_typedocument: '1', customer_state: '1', customer_country: 'PERÚ' });
  }

  close(): void {
    this.onClose.emit();
  }
}