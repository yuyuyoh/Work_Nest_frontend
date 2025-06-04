import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';
import { environment } from '../../environments/environment';
import { ApplicationRequest } from '../models/application-request.model';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = `${environment.apiUrl}/applications`;

  constructor(private http: HttpClient) {}

  getApplicationsByJobseeker(jobseekerId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/jobseeker/${jobseekerId}`);
  }

  getApplicationsByJob(jobId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/job/${jobId}`);
  }

  submitApplication(applicationRequest: ApplicationRequest): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}`, applicationRequest);
  }

  uploadCV(jobseekerId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.apiUrl}/users/jobseekers/${jobseekerId}/upload-cv`, formData);
  }

}
