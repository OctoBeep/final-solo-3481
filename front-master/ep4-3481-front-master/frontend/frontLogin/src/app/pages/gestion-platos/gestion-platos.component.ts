import { Component, OnInit } from '@angular/core';
import { platosService } from 'src/app/services/platos.service';
import { Dish } from 'src/app/models/dish';

@Component({
  selector: 'app-gestion-platos',
  templateUrl: './gestion-platos.component.html',
  styleUrls: ['./gestion-platos.component.css']
})
export class GestionPlatosComponent implements OnInit {
  platos: Dish[] = [];  // Lista de platos
  nuevoPlato: Dish = { nombre: '', ingredientes: [], precio: 0 };  // Modelo para el nuevo plato
  ingredientesTexto: string = '';  // Propiedad para manejar los ingredientes como texto
  mostrarFormulario: boolean = false;  // Controla la visibilidad del formulario
  editarModo: boolean = false;  // Controla si estamos en modo de edición
  idBusqueda: string = '';  // Propiedad para el ID de búsqueda

  constructor(private dishService: platosService) { }

  ngOnInit(): void {
    this.obtenerPlatos();  // Obtener los platos al inicio
  }

  // Obtener todos los platos
  obtenerPlatos(): void {
    this.dishService.getPlatos().subscribe(
      (data) => {
        this.platos = data;  // Actualiza la lista de platos con los datos del servidor
      },
      (error) => {
        console.error('Error al obtener los platos:', error);
      }
    );
  }

  // Buscar un plato por ID
  buscarPlato(): void {
    if (this.idBusqueda) {
      this.dishService.getPlatoPorId(this.idBusqueda).subscribe(
        (data) => {
          this.platos = [data];  // Mostrar solo el plato encontrado
        },
        (error) => {
          console.error('Error al obtener el plato por ID:', error);
          this.platos = [];  // Limpiar la lista si no se encuentra el plato
        }
      );
    } else {
      this.obtenerPlatos();  // Si no hay ID, mostrar todos los platos
    }
  }

  // Agregar un nuevo plato o actualizar uno existente
  agregarPlato(): void {
    // Convertir la cadena de ingredientes en un array
    this.nuevoPlato.ingredientes = this.ingredientesTexto
      .split(',')
      .map(ing => ing.trim())
      .filter(ing => ing !== '');

    if (this.nuevoPlato._id) {
      // Si ya tiene un ID, es una actualización
      this.dishService.actualizarPlato(this.nuevoPlato._id, this.nuevoPlato).subscribe(
        (data) => {
          // Recargar la lista de platos automáticamente después de editar
          this.obtenerPlatos();  // Recargar la lista completa de platos
          this.resetFormulario();  // Limpiar el formulario
        },
        (error) => {
          console.error('Error al actualizar el plato:', error);
        }
      );
    } else {
      // Si no tiene un ID, es una nueva creación
      this.dishService.crearPlato(this.nuevoPlato).subscribe(
        (data) => {
          // Agregar el nuevo plato a la lista sin necesidad de recargar
          this.platos.push(data);  // Añadir el nuevo plato a la lista actual
          this.resetFormulario();  // Limpiar el formulario
        },
        (error) => {
          console.error('Error al agregar el plato:', error);
        }
      );
    }
  }

  // Eliminar un plato
  eliminarPlato(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este plato?')) {
      this.dishService.eliminarPlato(id).subscribe(
        () => {
          // Eliminar el plato de la lista localmente
          this.platos = this.platos.filter(plato => plato._id !== id);  // Filtrar el plato eliminado
        },
        (error) => {
          console.error('Error al eliminar el plato:', error);
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

  // Restablecer el formulario después de agregar o editar un plato
  resetFormulario(): void {
    this.nuevoPlato = { nombre: '', ingredientes: [], precio: 0 };
    this.ingredientesTexto = '';  // Limpiar campo de ingredientes
    this.mostrarFormulario = false;
    this.editarModo = false;
  }

  // Establecer el plato a editar
  editarPlato(id: string): void {
    this.dishService.getPlatoPorId(id).subscribe(
      (plato) => {
        this.nuevoPlato = { ...plato };  // Cargar los datos del plato a editar
        this.ingredientesTexto = plato.ingredientes.join(', ');  // Convertir ingredientes a cadena
        this.mostrarFormulario = true;
        this.editarModo = true;
      },
      (error) => {
        console.error('Error al obtener los datos del plato:', error);
      }
    );
  }
}
