import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { JobRequest } from '../../models/job-request.model';
import {FormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, FormsModule], // <--- FormsModule obligatoire ici
  templateUrl: './add-job.html',
  styleUrls: ['./add-job.css']
})
export class AddJob {
  job: JobRequest = {
    title: '',
    description: '',
    location: '',
    salaryMin: null,
    salaryMax: null,
    type: 'FULL_TIME',
    employerId: 0
  };
  success = false;
  error: string | null = null;

  constructor(private jobService: JobService) {
    // Récupérer l'employerId depuis le localStorage
    const storedEmployerId = localStorage.getItem('userId');
    if (storedEmployerId) {
      this.job.employerId = parseInt(storedEmployerId, 10);
    }
  }

  submitJob() {
    this.jobService.createJob(this.job).subscribe({
      next: () => {
        this.success = true;
        this.error = null;
      },
      error: () => {
        this.success = false;
        this.error = "Erreur lors de la publication de l'offre.";
      }
    });
  }
}
