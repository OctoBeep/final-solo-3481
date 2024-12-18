import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/users/login/login.component';
import { DashboardComponent } from './pages/users/dashboard/dashboard.component'; 
import { RouterModule } from '@angular/router';
import { GestionMeserosComponent } from './pages/gestion-meseros/gestion-meseros.component';
import { FormsModule } from '@angular/forms';
import { GestionClientesComponent } from './pages/gestion-clientes/gestion-clientes.component';
import { GestionCategoriasComponent } from './pages/gestion-categorias/gestion-categorias.component';
import { GestionPlatosComponent } from './pages/gestion-platos/gestion-platos.component';
import { GestionOrdenesComponent } from './pages/gestion-ordenes/gestion-ordenes.component';  // Importa FormsModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GestionMeserosComponent,
    GestionClientesComponent,
    GestionCategoriasComponent,
    GestionPlatosComponent,
    GestionOrdenesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule  // Asegúrate de agregar FormsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
