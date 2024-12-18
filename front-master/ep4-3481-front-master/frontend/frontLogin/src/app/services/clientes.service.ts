import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/api/clientes';  // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientePorId(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  crearCliente(cliente: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, cliente);
  }

  actualizarCliente(id: string, cliente: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, cliente);
  }

  eliminarCliente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
