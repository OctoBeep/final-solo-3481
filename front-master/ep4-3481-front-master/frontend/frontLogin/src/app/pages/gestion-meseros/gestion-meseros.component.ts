import { Component, OnInit } from '@angular/core';
import { MeseroService } from 'src/app/services/mesero.service';
import { Waiter } from 'src/app/models/waiter';

@Component({
  selector: 'app-gestion-meseros',
  templateUrl: './gestion-meseros.component.html',
  styleUrls: ['./gestion-meseros.component.css']
})
export class GestionMeserosComponent implements OnInit {
  meseros: Waiter[] = [];  // Almacena la lista de meseros
  nuevoMesero: Waiter = { nombre: '', apellido: '', email: '', dni: '' };  // Modelo para el nuevo mesero
  mostrarFormulario: boolean = false;  // Controla la visibilidad del formulario
  editarModo: boolean = false;  // Controla si estamos en modo de edición

  constructor(private meseroService: MeseroService) { }

  ngOnInit(): void {
    this.obtenerMeseros();  // Cargar los meseros al inicio
  }

  // Obtener todos los meseros
  obtenerMeseros(): void {
    this.meseroService.getMeseros().subscribe(
      (data) => {
        this.meseros = data;
      },
      (error) => {
        console.error('Error al obtener meseros:', error);
      }
    );
  }

  // Agregar un nuevo mesero o actualizar uno existente
  agregarMesero(): void {
    if (this.nuevoMesero._id) {
      // Si ya tiene un ID, es una actualización
      this.meseroService.actualizarMesero(this.nuevoMesero._id, this.nuevoMesero).subscribe(
        (data) => {
          console.log('Mesero actualizado:', data);
          const index = this.meseros.findIndex(m => m._id === this.nuevoMesero._id);
          if (index !== -1) {
            this.meseros[index] = data;  // Actualizar mesero en la lista
          }
          this.resetFormulario();  // Limpiar el formulario después de actualizar
        },
        (error) => {
          console.error('Error al actualizar mesero:', error);
        }
      );
    } else {
      // Si no tiene un ID, es un nuevo mesero
      this.meseroService.crearMesero(this.nuevoMesero).subscribe(
        (data) => {
          console.log('Mesero agregado:', data);
          this.meseros.push(data);  // Añadir el nuevo mesero a la lista
          this.resetFormulario();  // Limpiar el formulario después de agregar
        },
        (error) => {
          console.error('Error al agregar mesero:', error);
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

  // Establecer el mesero que vamos a editar, cargando sus datos
  editarMesero(id: string): void {
    this.meseroService.getMeseroPorId(id).subscribe(
      (mesero) => {
        this.nuevoMesero = mesero;  // Cargar los datos del mesero en el formulario
        this.mostrarFormulario = true;  // Mostrar el formulario de edición
        this.editarModo = true;  // Establecer que estamos en modo de edición
      },
      (error) => {
        console.error('Error al obtener los datos del mesero:', error);
      }
    );
  }

  // Eliminar mesero (eliminación lógica)
  eliminarMesero(id: string): void {
    if (confirm('Se borrará lógicamente el mesero, para poder seguir viéndolo consulte su base de datos. ¿Estás seguro de que deseas continuar?')) {
      this.meseroService.eliminarMesero(id).subscribe(
        () => {
          // Actualizamos el estado del mesero en la lista para "ocultarlo" lógicamente
          this.meseros = this.meseros.filter(m => m._id !== id);  // Filtrar el mesero de la lista
        },
        (error) => {
          console.error('Error al eliminar mesero:', error);
        }
      );
    }
  }

  // Resetear el formulario
  resetFormulario(): void {
    this.nuevoMesero = { nombre: '', apellido: '', email: '', dni: '' };  // Limpiar formulario
    this.mostrarFormulario = false;  // Ocultar el formulario
    this.editarModo = false;  // Resetear el modo de edición
  }
}
