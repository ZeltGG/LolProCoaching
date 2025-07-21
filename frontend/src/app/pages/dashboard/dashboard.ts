import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  user: any = null;
  sessions: any[] = [];
  upcomingSessions: any[] = [];
  loading = false;
  error = '';

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) this.user = JSON.parse(storedUser);

    this.fetchSessions();
  }

  fetchSessions(): void {
    this.loading = true;
    this.error = '';
    this.sessionService.getSessions().subscribe({
      next: (res) => {
        const validSessions = Array.isArray(res) ? res.filter(s => s && s.date && s.time) : [];
        this.sessions = validSessions;

        const now = new Date();
        this.upcomingSessions = validSessions
          .map(s => ({ ...s, start: this._toDate(s.date, s.time) }))
          .filter(s => s.start instanceof Date && !isNaN(s.start.getTime()) && s.start >= now)
          .sort((a, b) => a.start.getTime() - b.start.getTime())
          .slice(0, 3);

        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error cargando sesiones:', err);
        this.error = err.error?.message || 'No se pudieron cargar tus sesiones.';
        this.sessions = [];
        this.upcomingSessions = [];
        this.loading = false;
      }
    });
  }

  private _toDate(dateStr: string, timeStr: string): Date {
    try {
      const date = new Date(`${dateStr}T${timeStr}:00`);
      return isNaN(date.getTime()) ? new Date('2099-01-01T00:00:00') : date;
    } catch {
      return new Date('2099-01-01T00:00:00');
    }
  }
}