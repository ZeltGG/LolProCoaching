import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session.service'; // ✅ Servicio para crear sesiones

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
    private sessionService: SessionService
  ) {
    this.sessionForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: [
        60,
        [Validators.required, Validators.min(60), Validators.max(120)],
      ],
      notes: [''] // Este será usado como description
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

    const sessionData = {
      title: formData.title.trim(),
      description: formData.notes?.trim() || '',     // ✅ "notes" se envía como "description"
      date: formData.date,                           // ✅ Campo separado para fecha
      time: formData.time,                           // ✅ Campo separado para hora
      duration: Number(formData.duration)            // ✅ Duración numérica
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
        alert(err?.error?.message || 'Error al agendar la sesión');
      }
    });
  }
}