import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-gestion-categorias',
  templateUrl: './gestion-categorias.component.html',
  styleUrls: ['./gestion-categorias.component.css']
})
export class GestionCategoriasComponent implements OnInit {
  categorias: Category[] = [];  // Lista de categorías
  nuevaCategoria: Category = { nombre: '', descripcion: '' };  // Modelo para nueva categoría
  mostrarFormulario: boolean = false;  // Controla la visibilidad del formulario
  editarModo: boolean = false;  // Controla si estamos en modo de edición
  editarCategoriaId: string | null = null;  // Almacena el ID de la categoría seleccionada para editar
  categoriaEditada: Category = { nombre: '', descripcion: '' };  // Modelo para categoría editada

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.obtenerCategorias();  // Cargar las categorías al inicio
  }

  // Obtener todas las categorías
  obtenerCategorias(): void {
    this.categoriasService.getCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  // Agregar una nueva categoría o actualizar una existente
  agregarCategoria(): void {
    if (this.nuevaCategoria._id) {
      // Si ya tiene un ID, es una actualización
      this.categoriasService.actualizarCategoria(this.nuevaCategoria._id, this.nuevaCategoria).subscribe(
        (data) => {
          console.log('Categoría actualizada:', data);
          const index = this.categorias.findIndex(c => c._id === this.nuevaCategoria._id);
          if (index !== -1) {
            this.categorias[index] = data;  // Actualizar la categoría en la lista
          }
          this.resetFormulario();  // Limpiar el formulario después de actualizar
        },
        (error) => {
          console.error('Error al actualizar categoría:', error);
        }
      );
    } else {
      // Si no tiene un ID, es una nueva categoría
      this.categoriasService.crearCategoria(this.nuevaCategoria).subscribe(
        (data) => {
          console.log('Categoría agregada:', data);
          this.categorias.push(data);  // Añadir la nueva categoría a la lista
          this.resetFormulario();  // Limpiar el formulario después de agregar
        },
        (error) => {
          console.error('Error al agregar categoría:', error);
        }
      );
    }
  }

  // Alternar la visibilidad del formulario
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.resetFormulario();  // Limpiar el formulario cuando se cierra
    }
  }

  editarCategoria(id: string): void {
    this.categoriasService.getCategoriaPorId(id).subscribe(
      (categoria) => {
        this.nuevaCategoria = categoria;  // Cargar los datos de la categoría en el formulario
        this.editarCategoriaId = categoria._id || null;  // Establecer el ID de la categoría a editar
        this.mostrarFormulario = true;  // Mostrar el formulario de edición
        this.editarModo = true;  // Establecer que estamos en modo de edición
      },
      (error) => {
        console.error('Error al obtener los datos de la categoría:', error);
      }
    );
  }
  
  // Actualizar la categoría editada
  editarCategoriaSubmit(): void {
    if (this.editarCategoriaId) {
      this.categoriasService.actualizarCategoria(this.editarCategoriaId, this.categoriaEditada).subscribe(
        (data) => {
          console.log('Categoría actualizada:', data);
          const index = this.categorias.findIndex(c => c._id === this.editarCategoriaId);
          if (index !== -1) {
            this.categorias[index] = data;  // Actualizar la categoría en la lista
          }
          this.resetFormulario();  // Limpiar el formulario después de actualizar
        },
        (error) => {
          console.error('Error al actualizar categoría:', error);
        }
      );
    }
  }

  // Eliminar categoría
  eliminarCategoria(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriasService.eliminarCategoria(id).subscribe(
        () => {
          this.categorias = this.categorias.filter(c => c._id !== id);  // Eliminar de la lista
        },
        (error) => {
          console.error('Error al eliminar categoría:', error);
        }
      );
    }
  }

  // Resetear el formulario
  resetFormulario(): void {
    this.nuevaCategoria = { nombre: '', descripcion: '' };  // Limpiar formulario
    this.mostrarFormulario = false;  // Ocultar el formulario
    this.editarModo = false;  // Resetear el modo de edición
    this.editarCategoriaId = null;  // Resetear el ID de edición
    this.categoriaEditada = { nombre: '', descripcion: '' };  // Limpiar los datos de edición
  }
}
