// src/app/services/password-reset.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private apiUrl = 'http://localhost:8091/api/v1/auth';

  constructor(private http: HttpClient) { }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-reset`, { email });
  }

  

  resetPassword(token: string, newPassword: string): Observable<any> {
    const resetPasswordUrl = `http://localhost:4200/#/authentication/locked?token=${token}`;
    return this.http.post(`${this.apiUrl}/reset-password?token=${token}`, { newPassword, resetPasswordUrl });
  }
  
}
