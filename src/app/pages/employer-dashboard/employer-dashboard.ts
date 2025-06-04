import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { ApplicationService } from '../../services/application.service';
import { Job } from '../../models/job.model';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employer-dashboard.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboard implements OnInit {
  jobs: Job[] = [];
  isLoading = true;
  error: string | null = null;
  employerId: number;

  // Pour les candidatures par offre
  applicationsByJob: { [jobId: number]: Application[] } = {};
  loadingApplications: { [jobId: number]: boolean } = {};
  showApplications: { [jobId: number]: boolean } = {};
  applicationsError: { [jobId: number]: string | null } = {};

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService
  ) {
    // Récupérer l'employerId depuis le localStorage
    const storedEmployerId = localStorage.getItem('userId');
    this.employerId = storedEmployerId ? parseInt(storedEmployerId, 10) : 0;
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobsByEmployer(this.employerId).subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = "Impossible de récupérer les offres";
        this.isLoading = false;
      }
    });
  }

  deleteJob(jobId: number | undefined): void {
    if (jobId === undefined) {
      alert('Identifiant de l\'offre introuvable !');
      return;
    }
    if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      this.jobService.deleteJob(jobId).subscribe({
        next: () => {
          this.jobs = this.jobs.filter(job => job.id !== jobId);
        },
        error: () => {
          alert('Erreur lors de la suppression de l\'offre.');
        }
      });
    }
  }

  // Gestion affichage candidatures
  toggleApplications(jobId: number): void {
    // Si déjà affiché, on masque
    if (this.showApplications[jobId]) {
      this.showApplications[jobId] = false;
      return;
    }
    // Sinon, on affiche et charge si besoin
    this.showApplications[jobId] = true;
    if (!this.applicationsByJob[jobId]) {
      this.loadingApplications[jobId] = true;
      this.applicationService.getApplicationsByJob(jobId).subscribe({
        next: (applications) => {
          this.applicationsByJob[jobId] = applications;
          this.loadingApplications[jobId] = false;
        },
        error: () => {
          this.applicationsError[jobId] = "Impossible de charger les candidatures";
          this.loadingApplications[jobId] = false;
        }
      });
    }
  }
}
