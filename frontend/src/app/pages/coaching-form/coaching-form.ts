import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coaching-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './coaching-form.html',
  styleUrls: ['./coaching-form.scss']
})
export class CoachingFormComponent {
  coachingForm: FormGroup;
  submitted = false;
  successMessage = '';

  availableHours = [
    '09:00', '10:00', '21:00', '22:00', '23:00', '00:00', '01:00'
  ];

  constructor(private fb: FormBuilder) {
    this.coachingForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(2)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';

    if (this.coachingForm.invalid) return;

    console.log('✅ Datos enviados:', this.coachingForm.value);
    this.successMessage = '¡Reserva realizada exitosamente!';
    this.coachingForm.reset();
    this.submitted = false;
  }
}