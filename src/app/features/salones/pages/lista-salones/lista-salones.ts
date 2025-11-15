import { Component, OnInit } from '@angular/core';
import { Salon } from '../../../../core/interfaces/salones-mesas/salon';
import { BehaviorSubject, Observable, startWith, switchMap, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { GestionService } from '../../../../core/services/gestion.service';
import { Mesa } from '../../../../core/interfaces/salones-mesas/mesa';

@Component({
  selector: 'app-lista-salones',
  standalone: false,
  templateUrl: './lista-salones.html',
  styleUrl: './lista-salones.scss',
})
export class ListaSalones implements OnInit {
  // --- Observables para los datos ---
  public salones$: Observable<Salon[]>;
  public mesas$: Observable<Mesa[]>;

  // --- Control de Estado ---
  // Guarda el ID del salón que está seleccionado
  private salonSeleccionado = new BehaviorSubject<string>('');
  public salonSeleccionadoId: string = '';

  // Control para el campo de búsqueda de salones
  public filtroNombre = new FormControl('');

  // Estados de carga (para mostrar spinners/skeletons)
  public cargandoSalones: boolean = false;
  public cargandoMesas: boolean = false;

  // --- Estado de Modales ---
  public modalSalonVisible: boolean = false;
  public salonParaEditar: Salon | null = null;
  // (Aquí también iría la lógica para el modal de mesas)

  constructor(private gestionService: GestionService) {
    // --- Lógica de Salones (Columna Izquierda) ---
    // Creamos un observable 'salones$' que reacciona a los cambios
    // del campo de búsqueda 'filtroNombre'.
    this.salones$ = this.filtroNombre.valueChanges.pipe(
      startWith(''), // Empieza con un string vacío para cargar al inicio
      tap(() => (this.cargandoSalones = true)), // Activa el estado de carga
      switchMap((nombre) =>
        // Llama al servicio con el valor del filtro
        this.gestionService.getSalones(nombre || '')
      ),
      tap(() => (this.cargandoSalones = false)) // Desactiva el estado de carga
    );

    // --- Lógica de Mesas (Columna Derecha) ---
    // Creamos un observable 'mesas$' que reacciona a los cambios
    // del 'salonSeleccionado'.
    this.mesas$ = this.salonSeleccionado.asObservable().pipe(
      tap(() => (this.cargandoMesas = true)), // Activa el estado de carga
      switchMap((id) =>
        // Llama al servicio solo si hay un ID
        this.gestionService.getMesasPorSalon(id)
      ),
      tap(() => (this.cargandoMesas = false)) // Desactiva el estado de carga
    );
  }

  ngOnInit(): void {
    // (Opcional) Si quieres que la primera mesa se cargue al inicio
    // this.salones$.subscribe(salones => {
    //   if (salones.length > 0) {
    //     this.seleccionarSalon(salones[0]);
    //   }
    // });
  }

  // --- MÉTODOS DE SALONES ---

  /**
   * Se llama cuando el usuario hace clic en un salón.
   * Actualiza el BehaviorSubject, lo que dispara la recarga de 'mesas$'.
   */
  seleccionarSalon(salon: Salon): void {
    this.salonSeleccionadoId = salon.lounge_id.toString();
    this.salonSeleccionado.next(this.salonSeleccionadoId);
  }

  /**
   * Abre el modal para crear un NUEVO salón.
   * (Este es el que haremos reutilizable)
   */
  abrirModalCrearSalon(): void {
    this.salonParaEditar = null; // 'null' significa que es "Crear"
    this.modalSalonVisible = true;
  }

  /**
   * Abre el modal para EDITAR un salón existente.
   */
  abrirModalEditarSalon(salon: Salon): void {
    this.salonParaEditar = { ...salon }; // Pasa una copia del salón
    this.modalSalonVisible = true;
  }

  /**
   * Cierra el modal (ya sea de crear o editar).
   */
  cerrarModalSalon(): void {
    this.modalSalonVisible = false;
  }

  /**
   * Se llama cuando el modal (hijo) guarda con éxito.
   */
  onSalonGuardado(): void {
    this.cerrarModalSalon();
    // Refrescamos la lista de salones forzando una nueva emisión
    this.filtroNombre.setValue(this.filtroNombre.value);
  }

  // --- MÉTODOS DE MESAS ---

  // (Aquí iría la lógica para abrir/cerrar el modal de Editar Mesa)
}