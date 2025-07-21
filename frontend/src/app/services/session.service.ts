import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/api/sessions';

  constructor(private http: HttpClient) {}

  createSession(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('🎫 Token desde localStorage:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, data, { headers });
  }

  getSessions(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('📤 Token que se enviará:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.apiUrl, { headers });
  }
}