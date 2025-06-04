import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getJobseekerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/jobseekers/${id}`);
  }

  updateJobseeker(id: number, jobseeker: any) {
    return this.http.put<any>(`${this.apiUrl}/users/jobseekers/${id}`, jobseeker);
  }

  /**
   * Met à jour l'email ou le mot de passe du candidat
   * @param id id du jobseeker (number)
   * @param credentials { email, currentPassword, newPassword }
   */
  updateCredentials(id: number, credentials: { email: string, currentPassword: string, newPassword: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/jobseekers/${id}/credentials`, credentials);
  }
}
