import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.error = '';
    this.success = '';

    if (!this.username || !this.email || !this.password) {
      this.error = 'Por favor, completa todos los campos.';
      return;
    }

    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.success = '¡Registro exitoso! Ahora puedes iniciar sesión.';
        this.username = '';
        this.email = '';
        this.password = '';
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrar.';
      }
    });
  }
}