import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('userId', res.userId.toString());
        localStorage.setItem('role', res.role);
      })
    );
  }

  registerJobseeker(jobseeker: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobseekers`, jobseeker);
  }

  registerEmployer(employer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employers`, employer);
  }

  getCurrentUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.clear();
  }
}
