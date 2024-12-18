import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from "../models/usuario"; // Asegúrate de que el modelo Usuario esté bien definido

@Injectable({
  providedIn: "root"
})
export class DataLoginService {
  private url = 'http://localhost:3000/api/login';  // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  loginUser(usuario: Usuario): Observable<any> {
    // Realizamos una solicitud POST enviando el objeto usuario
    return this.http.post(this.url, usuario);
  }
}
