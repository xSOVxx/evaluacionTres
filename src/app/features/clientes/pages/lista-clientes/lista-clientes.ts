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
  
  public clientes$!: Observable<Cliente[]>;
  public searchControl = new FormControl('');
  public modalVisible: boolean = false;
  public clienteParaEditar: Cliente | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clientes$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap(nombre => this.clienteService.getCustomers(nombre || ''))
    );
  }
  
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
    this.cerrarModal();
    this.searchControl.setValue(this.searchControl.value);
  }
}
