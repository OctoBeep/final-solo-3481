import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class platosService {
  private apiUrl = 'http://localhost:3000/api/platos';  // Ruta de la API

  constructor(private http: HttpClient) { }

  getPlatos(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }

  getPlatoPorId(id: string): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

  crearPlato(plato: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.apiUrl, plato);
  }

  actualizarPlato(id: string, plato: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}`, plato);
  }

  eliminarPlato(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
