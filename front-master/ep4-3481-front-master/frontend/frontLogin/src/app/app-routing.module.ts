import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/users/login/login.component';  // Componente de Login
import { DashboardComponent } from './pages/users/dashboard/dashboard.component'; // Componente del Dashboard
import { GestionMeserosComponent } from './pages/gestion-meseros/gestion-meseros.component';  // Componente de Gestión de Meseros
import { GestionCategoriasComponent } from './pages/gestion-categorias/gestion-categorias.component';  // Componente de Gestión de Categorías
import { GestionClientesComponent } from './pages/gestion-clientes/gestion-clientes.component';  // Componente de Gestión de Clientes
import { GestionPlatosComponent } from './pages/gestion-platos/gestion-platos.component';  // Componente de Gestión de Platos
import { GestionOrdenesComponent } from './pages/gestion-ordenes/gestion-ordenes.component';  // Componente de Gestión de Órdenes (si lo tienes)

const routes: Routes = [
  { path: '', component: LoginComponent },  // Ruta inicial para Login
  { path: 'login', component: LoginComponent },  // Ruta explícita para Login
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'gestion-meseros', pathMatch: 'full' },  // Redirige automáticamente a gestion-meseros
      { path: 'gestion-meseros', component: GestionMeserosComponent },  // Componente de Gestión de Meseros
      { path: 'gestion-categorias', component: GestionCategoriasComponent },  // Componente de Gestión de Categorías
      { path: 'gestion-clientes', component: GestionClientesComponent },  // Componente de Gestión de Clientes
      { path: 'gestion-platos', component: GestionPlatosComponent },  // Componente de Gestión de Platos
      { path: 'gestion-ordenes', component: GestionOrdenesComponent }  // Componente de Gestión de Órdenes
    ]
  },
  { path: '**', redirectTo: '' }  // Ruta no encontrada redirige al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura el Router con las rutas definidas
  exports: [RouterModule]  // Exporta el RouterModule para ser usado en la aplicación
})
export class AppRoutingModule { }
