import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = `${environment.apiUrl}/files`;

  constructor(private http: HttpClient) {}

  // UPLOAD CV du candidat
  uploadCV(jobseekerId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // On retourne l'observable, le log se fait dans le composant qui appelle cette méthode
    return this.http.post<any>(
      `${environment.apiUrl}/users/jobseekers/${jobseekerId}/upload-cv`,
      formData,
    );
  }

  // Supprimer un fichier CV
  deleteFile(jobseekerId: number, filename: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/files/resume/${jobseekerId}/${filename}`
    );
  }

  // Télécharger un fichier
  getFile(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${filename}`, { responseType: 'blob' });
  }
}
