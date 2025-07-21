import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder) {
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
      return;
    }

    const formData = this.sessionForm.value;
    console.log('✅ Datos de sesión enviados:', formData);

    // Aquí iría tu lógica para enviar la sesión al backend
  }
}