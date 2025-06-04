import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { ApplicationRequest } from '../../models/application-request.model';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './job-application.html',
  styleUrls: ['./job-application.css']
})
export class JobApplication implements OnInit {
  jobId!: number;

  application: ApplicationRequest = {
    jobId: 0,
    jobseekerId: 0,
    status: 'SUBMITTED'
  };
  selectedFile: File | null = null;
  success: boolean = false;
  error: string | null = null;
  uploadInfo: string | null = null; // Pour afficher un éventuel souci d'upload CV

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.application.jobId = this.jobId;

    const storedJobseekerId = localStorage.getItem('userId');
    if (storedJobseekerId) {
      this.application.jobseekerId = parseInt(storedJobseekerId, 10);
    } else {
      this.error = "Impossible de récupérer l'identifiant du candidat (veuillez vous connecter).";
    }

    this.application.status = 'SUBMITTED';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submitApplication(): void {
    this.application.status = 'SUBMITTED';
    this.applicationService.submitApplication(this.application).subscribe({
      next: () => {
        // Affiche toujours le message succès
        this.success = true;
        this.error = null;
        // Si un fichier est sélectionné, tente l'upload
        if (this.selectedFile) {
          this.uploadCV(this.application.jobseekerId, this.selectedFile);
        }
      },
      error: () => {
        this.error = 'Erreur lors de la soumission de la candidature.';
        this.success = false;
      }
    });
  }

  uploadCV(jobseekerId: number, file: File) {
    this.applicationService.uploadCV(jobseekerId, file).subscribe({
      next: () => {
        this.uploadInfo = 'CV uploadé avec succès !';
      },
      error: () => {

        this.uploadInfo = 'Candidature envoyée';
      }
    });
  }
}
