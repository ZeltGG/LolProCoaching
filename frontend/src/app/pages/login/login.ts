import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('📦 Respuesta completa del backend:', res);

        if (res.token) {
          // Centralizamos almacenamiento de sesión
          this.authService.setUser(res.user, res.token);
          console.log('✅ Sesión guardada exitosamente');
          this.router.navigate(['/dashboard']);
        } else {
          console.error('❌ Token no recibido en la respuesta');
          this.errorMessage = 'No se recibió el token de autenticación.';
        }
      },
      error: (err) => {
        console.error('❌ Error en login:', err);
        this.errorMessage = err.error?.msg || 'Credenciales inválidas.';
      }
    });
  }
}