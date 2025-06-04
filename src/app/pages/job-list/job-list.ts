import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.css']
})
export class JobList implements OnInit {
  jobs: Job[] = [];
  isLoading = true;
  error: string | null = null;

  // Filtres
  searchText: string = '';
  selectedLocation: string = '';
  selectedType: string = '';
  salaryMin: number | null = null;
  salaryMax: number | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobsSortedByDate();
  }

  // Charger les offres triées par date
  loadJobsSortedByDate(): void {
    this.isLoading = true;
    this.error = null;
    this.jobService.getJobsSortedByDate().subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des offres.';
        this.isLoading = false;
      }
    });
  }

  // Filtrer les offres (recherche avancée)
  filterJobs(): void {
    this.isLoading = true;
    this.error = null;
    const filters = {
      title: this.searchText,
      location: this.selectedLocation,
      type: this.selectedType,
      minSalary: this.salaryMin,
      maxSalary: this.salaryMax
    };
    this.jobService.searchJobs(filters).subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Erreur lors du filtrage des offres.';
        this.isLoading = false;
      }
    });
  }

}
