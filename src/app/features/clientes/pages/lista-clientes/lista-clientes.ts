import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../core/interfaces/clientes/cliente';
import { Observable, startWith, switchMap } from 'rxjs';
import { ClienteService } from '../../../../core/services/clientes.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-clientes',
  standalone: false,
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.scss',
})
export class ListaClientes implements OnInit {
  
  // 1. Observable que alimenta la tabla
  public clientes$!: Observable<Cliente[]>;
  
  // 2. FormControl para el campo de búsqueda (Búsqueda reactiva)
  public searchControl = new FormControl('');
  
  // 3. Estado del modal (para el futuro)
  public modalVisible: boolean = false;
  public clienteParaEditar: Cliente | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    // 4. Inicializa el Observable para reaccionar a la búsqueda
    // Cada vez que 'searchControl' cambia, dispara una nueva llamada a la API
    this.clientes$ = this.searchControl.valueChanges.pipe(
      startWith(''), // Dispara la carga inicial
      switchMap(nombre => this.clienteService.getCustomers(nombre || ''))
    );
  }
  
  // --- Métodos de UI y Modal ---
  
  abrirModalCrear() {
    this.clienteParaEditar = null;
    this.modalVisible = true;
}

abrirModalEditar(cliente: Cliente) {
    this.clienteParaEditar = cliente;
    this.modalVisible = true;
}
  
  cerrarModal() {
    this.modalVisible = false;
  }
  
  onClienteGuardado() {
    // Después de guardar, cerramos el modal y forzamos una nueva búsqueda 
    // (emitiendo un valor vacío) para refrescar la lista.
    this.cerrarModal();
    this.searchControl.setValue(this.searchControl.value);
  }
 }
