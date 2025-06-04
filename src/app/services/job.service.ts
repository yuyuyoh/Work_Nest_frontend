import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { JobRequest } from '../models/job-request.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = `${environment.apiUrl}/jobs`;

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  createJob(job: JobRequest): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getJobsByEmployer(employerId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/employer/${employerId}`);
  }

  // ======  FILTRER ======
  searchJobs(filters: any): Observable<Job[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get<Job[]>(`${this.apiUrl}/search`, { params });
  }

  // AJOUT POUR TRIER PAR DATE
  getJobsSortedByDate(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/sorted-by-date`);
  }
  // modifiaction du mdp/email
  updateCredentials(id: number, credentials: { email: string, currentPassword: string, newPassword: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/jobseekers/${id}/credentials`, credentials);
  }

}
