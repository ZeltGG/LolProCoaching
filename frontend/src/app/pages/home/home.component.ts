import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 👈 Importante para routerLink

@Component({
  selector: 'app-home',
  standalone: true, // 👈 Ahora es standalone
  imports: [
    CommonModule,
    RouterModule // 👈 Necesario para que funcione el botón con routerLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    console.log('✅ AOS inicializado');
    AOS.init({ duration: 1000 });
  }
}