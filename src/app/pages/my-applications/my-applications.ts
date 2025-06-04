import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-applications.html',
  styleUrls: ['./my-applications.css']
})
export class MyApplications implements OnInit {
  applications: any[] = [];
  isLoading = true;
  error: string | null = null;
  jobseekerId: number;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {
    this.jobseekerId = this.authService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.applicationService.getApplicationsByJobseeker(this.jobseekerId).subscribe({
      next: (data) => {
        this.applications = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = "Impossible de récupérer les candidatures";
        this.isLoading = false;
      }
    });
  }
}
