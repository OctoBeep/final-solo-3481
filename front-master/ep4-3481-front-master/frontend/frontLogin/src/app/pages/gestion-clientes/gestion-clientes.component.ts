import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/clientes.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.css']
})
export class GestionClientesComponent implements OnInit {
  clientes: Client[] = [];  // Almacena la lista de clientes
  nuevoCliente: Client = { nombre: '', email: '', telefono: '', dni: '' };  // Modelo para el nuevo cliente
  mostrarFormulario: boolean = false;  // Controla la visibilidad del formulario
  editarModo: boolean = false;  // Controla si estamos en modo de edición
  clienteIdBusqueda: string = '';  // Almacena el ID para la búsqueda

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.obtenerClientes();  // Cargar los clientes al inicio
  }

  // Obtener todos los clientes
  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  // Buscar un cliente por ID
  buscarCliente(): void {
    if (this.clienteIdBusqueda) {
      this.clienteService.getClientePorId(this.clienteIdBusqueda).subscribe(
        (data) => {
          this.clientes = [data];  // Mostrar solo el cliente encontrado
        },
        (error) => {
          console.error('Error al obtener cliente por ID:', error);
          this.clientes = [];  // Limpiar la lista si no se encuentra el cliente
        }
      );
    } else {
      this.obtenerClientes();  // Si no hay ID, mostrar todos los clientes
    }
  }

  // Agregar un nuevo cliente o actualizar uno existente
  agregarCliente(): void {
    if (this.nuevoCliente._id) {
      // Si ya tiene un ID, es una actualización
      this.clienteService.actualizarCliente(this.nuevoCliente._id, this.nuevoCliente).subscribe(
        (data) => {
          const index = this.clientes.findIndex(c => c._id === this.nuevoCliente._id);
          if (index !== -1) {
            this.clientes[index] = data;  // Actualizar cliente en la lista
          }
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al actualizar cliente:', error);
        }
      );
    } else {
      // Si no tiene un ID, es un nuevo cliente
      this.clienteService.crearCliente(this.nuevoCliente).subscribe(
        (data) => {
          this.clientes.push(data);  // Añadir el nuevo cliente a la lista
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al agregar cliente:', error);
        }
      );
    }
  }

  // Alternar la visibilidad del formulario
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.resetFormulario();
    }
  }

  // Establecer el cliente que vamos a editar, cargando sus datos
  editarCliente(id: string): void {
    this.clienteService.getClientePorId(id).subscribe(
      (cliente) => {
        this.nuevoCliente = cliente;
        this.mostrarFormulario = true;
        this.editarModo = true;
      },
      (error) => {
        console.error('Error al obtener los datos del cliente:', error);
      }
    );
  }

  // Eliminar cliente
  eliminarCliente(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe(
        () => {
          this.clientes = this.clientes.filter(c => c._id !== id);
        },
        (error) => {
          console.error('Error al eliminar cliente:', error);
        }
      );
    }
  }

  // Resetear el formulario
  resetFormulario(): void {
    this.nuevoCliente = { nombre: '', email: '', telefono: '', dni: '' };  // Limpiar formulario
    this.mostrarFormulario = false;  // Ocultar el formulario
    this.editarModo = false;  // Resetear el modo de edición
  }
}
