import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waiter } from '../models/waiter';  // Asegúrate de tener el modelo Waiter

@Injectable({
  providedIn: 'root'
})
export class MeseroService {
  private apiUrl = 'http://localhost:3000/api/meseros';  // Cambia esta URL si es necesario

  constructor(private http: HttpClient) { }

  // Obtener todos los meseros
  getMeseros(): Observable<Waiter[]> {
    return this.http.get<Waiter[]>(this.apiUrl);
  }

  // Crear un nuevo mesero
  crearMesero(mesero: Waiter): Observable<Waiter> {
    return this.http.post<Waiter>(`${this.apiUrl}/crear`, mesero);
  }

  // Obtener un mesero por ID
  getMeseroPorId(id: string): Observable<Waiter> {
    return this.http.get<Waiter>(`${this.apiUrl}/${id}`);
  }

  // Actualizar los datos de un mesero
  actualizarMesero(id: string, mesero: Waiter): Observable<Waiter> {
    return this.http.put<Waiter>(`${this.apiUrl}/${id}`, mesero);
  }

  // Eliminar un mesero (eliminación lógica)
  eliminarMesero(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
