// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';  // Asegúrate de que el servicio AuthService exista
import { Usuario } from 'src/app/models/usuario';  // Asegúrate de que el modelo de Usuario esté bien definido

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;  // Aquí se usa el operador de exclamación "!" para decirle a TypeScript que esta propiedad será inicializada
  errorMessage: string = '';  // Variable para mostrar el error

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],  // Valida que el campo no esté vacío
      password: ['', Validators.required]   // Valida que el campo no esté vacío
    });
  }

  // Método que se ejecuta al enviar el formulario
  loginUser(): void {
    // Verifica que el formulario sea válido antes de enviar la solicitud
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, ingrese un nombre de usuario y contraseña válidos';
      return;
    }

    // Obtiene los valores del formulario y los asigna a un objeto Usuario
    const usuario: Usuario = this.loginForm.value;

    // Llama al servicio de autenticación para hacer login
    this.authService.login(usuario).subscribe(
      (response: any) => {
        // Si el login es exitoso, guarda el token en el localStorage
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);  // Redirige al Dashboard
      },
      (error) => {
        // Si ocurre un error (por ejemplo, usuario o contraseña incorrectos)
        this.errorMessage = 'Usuario o contraseña incorrectos';
        console.error(error);
      }
    );
  }
}
