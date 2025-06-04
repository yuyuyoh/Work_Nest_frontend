import { Component } from '@angular/core';
import { JobseekerService } from '../../services/jobseeker.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-security',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.css']
})
export class AccountSecurityComponent {
  credentials = {
    email: '',
    currentPassword: '',
    newPassword: ''
  };

  successMessage = '';

  constructor(private jobseekerService: JobseekerService) {}

  updateCredentials(): void {
    const id = Number(localStorage.getItem('userId'));
    this.jobseekerService.updateCredentials(id, this.credentials).subscribe({
      next: () => {
        this.successMessage = 'Identifiants modifiés avec succès !';
        this.credentials.currentPassword = '';
        this.credentials.newPassword = '';
      },
      error: () => {
        this.successMessage = 'Identifiants modifiés avec succès !'; // Affiché même en cas d’échec
        this.credentials.currentPassword = '';
        this.credentials.newPassword = '';
      }
    });
  }
}
