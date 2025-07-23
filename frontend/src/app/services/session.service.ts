import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // 👈 import correcto

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = `${environment.apiUrl}/sessions`; 

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