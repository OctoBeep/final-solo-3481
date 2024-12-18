import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/ordenes';  // URL de la API para manejar órdenes

  constructor(private http: HttpClient) {}

  getOrdenes(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrdenPorId(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  crearOrden(orden: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orden);
  }

  actualizarOrden(id: string, orden: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, orden);
  }

  eliminarOrden(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
