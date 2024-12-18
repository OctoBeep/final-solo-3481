import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/orders';

@Component({
  selector: 'app-gestion-ordenes',
  templateUrl: './gestion-ordenes.component.html',
  styleUrls: ['./gestion-ordenes.component.css']
})
export class GestionOrdenesComponent implements OnInit {
  orders: Order[] = [];  // Almacena la lista de órdenes
  nuevaOrden: Order = { platos: [{ nombre: '', cantidad: 1 }], estado: 'pendiente' };  // Modelo para la nueva orden
  mostrarFormulario: boolean = false;  // Controla la visibilidad del formulario
  editarModo: boolean = false;  // Controla si estamos en modo de edición
  orderIdBusqueda: string = '';  // Almacena el ID para la búsqueda

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.obtenerOrdenes();  // Cargar las órdenes al inicio
  }

  // Obtener todas las órdenes
  obtenerOrdenes(): void {
    this.orderService.getOrdenes().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error al obtener órdenes:', error);
      }
    );
  }

  // Buscar una orden por ID
  buscarOrden(): void {
    if (this.orderIdBusqueda) {
      this.orderService.getOrdenPorId(this.orderIdBusqueda).subscribe(
        (data) => {
          this.orders = [data];  // Mostrar solo la orden encontrada
        },
        (error) => {
          console.error('Error al obtener orden por ID:', error);
          this.orders = [];  // Limpiar la lista si no se encuentra la orden
        }
      );
    } else {
      this.obtenerOrdenes();  // Si no hay ID, mostrar todas las órdenes
    }
  }

  // Agregar una nueva orden o actualizar una existente
  agregarOrden(): void {
    if (this.nuevaOrden._id) {
      // Si ya tiene un ID, es una actualización
      this.orderService.actualizarOrden(this.nuevaOrden._id, this.nuevaOrden).subscribe(
        (data) => {
          // Actualizar la lista de órdenes automáticamente
          this.obtenerOrdenes();
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al actualizar orden:', error);
        }
      );
    } else {
      // Si no tiene un ID, es una nueva orden
      this.orderService.crearOrden(this.nuevaOrden).subscribe(
        (data) => {
          // Actualizar la lista de órdenes automáticamente
          this.obtenerOrdenes();
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al agregar orden:', error);
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

  // Establecer la orden que vamos a editar, cargando sus datos
  editarOrden(id: string): void {
    this.orderService.getOrdenPorId(id).subscribe(
      (order) => {
        this.nuevaOrden = order;
        this.mostrarFormulario = true;
        this.editarModo = true;
      },
      (error) => {
        console.error('Error al obtener los datos de la orden:', error);
      }
    );
  }

  // Eliminar orden
  eliminarOrden(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
      this.orderService.eliminarOrden(id).subscribe(
        () => {
          this.orders = this.orders.filter(order => order._id !== id);  // Eliminar la orden de la lista
        },
        (error) => {
          console.error('Error al eliminar orden:', error);
        }
      );
    }
  }

  // Restablecer el formulario después de agregar o editar una orden
  resetFormulario(): void {
    this.nuevaOrden = { platos: [{ nombre: '', cantidad: 1 }], estado: 'pendiente' };
    this.editarModo = false;
    this.mostrarFormulario = false;
  }
}
