import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session.service'; // 👈 importa el servicio

@Component({
  selector: 'app-new-session',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss'],
})
export class NewSessionComponent implements OnInit {
  sessionForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService // 👈 injecta el servicio
  ) {
    this.sessionForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: [
        60,
        [Validators.required, Validators.min(60), Validators.max(120)],
      ],
      notes: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;

    if (this.sessionForm.invalid) {
      console.warn('⚠️ Formulario inválido:', this.sessionForm.value);
      return;
    }

    const formData = this.sessionForm.value;

    // Combinar fecha y hora en un solo campo ISO
    const combinedDateTime = new Date(`${formData.date}T${formData.time}`);
    const sessionData = {
      title: formData.title,
      date: combinedDateTime.toISOString(),
      duration: formData.duration,
      notes: formData.notes,
    };

    console.log('📤 Enviando sesión al backend:', sessionData);

    this.sessionService.createSession(sessionData).subscribe({
      next: (res) => {
        console.log('✅ Sesión creada con éxito:', res);
        alert('Sesión agendada exitosamente');
        this.sessionForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error('❌ Error al crear sesión:', err);
        alert('Ocurrió un error al agendar la sesión');
      }
    });
  }
}