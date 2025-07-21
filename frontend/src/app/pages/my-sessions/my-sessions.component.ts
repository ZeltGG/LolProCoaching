import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';

type StatusFilter = 'all' | 'future' | 'past';

@Component({
  selector: 'app-my-sessions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-sessions.component.html',
  styleUrls: ['./my-sessions.component.scss']
})
export class MySessionsComponent implements OnInit {
  sessions: any[] = [];
  filteredSessions: any[] = [];
  loading = false;
  error = '';
  statusFilter: StatusFilter = 'all';

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.loading = true;
    this.error = '';
    this.sessionService.getSessions().subscribe({
      next: (res) => {
        const validSessions = Array.isArray(res)
          ? res.filter(s => s && s.date && s.time)
          : [];
        this.sessions = validSessions;
        this.updateFilteredSessions();
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al obtener sesiones:', err);
        this.error = err.error?.message || 'No se pudieron cargar las sesiones.';
        this.sessions = [];
        this.filteredSessions = [];
        this.loading = false;
      }
    });
  }

  updateFilteredSessions(): void {
    const now = new Date();
    this.filteredSessions = this.sessions
      .map(s => ({
        ...s,
        start: this._toDate(s.date, s.time),
        status: s.status === 'pending' ? 'Por aprobación' : s.status
      }))
      .filter(s => s.start instanceof Date && !isNaN(s.start.getTime()))
      .filter(s => {
        if (this.statusFilter === 'future') return s.start >= now;
        if (this.statusFilter === 'past') return s.start < now;
        return true;
      })
      .sort((a, b) => b.start.getTime() - a.start.getTime());
  }

  private _toDate(dateStr: string, timeStr: string): Date {
    try {
      const d = new Date(`${dateStr}T${timeStr}:00`);
      return isNaN(d.getTime()) ? new Date('2099-01-01T00:00:00') : d;
    } catch {
      return new Date('2099-01-01T00:00:00');
    }
  }
}