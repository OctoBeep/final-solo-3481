import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:3000/api/categorias';  // Cambia esta URL si es necesario

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getCategorias(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Crear una nueva categoría
  crearCategoria(categoria: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, categoria);
  }

  // Obtener una categoría por ID
  getCategoriaPorId(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);  // Corregido el uso de template literal
  }

  // Actualizar los datos de una categoría
  actualizarCategoria(id: string, categoria: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, categoria);  // Corregido el uso de template literal
  }

  // Eliminar una categoría completamente
  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);  // Corregido el uso de template literal
  }
}
