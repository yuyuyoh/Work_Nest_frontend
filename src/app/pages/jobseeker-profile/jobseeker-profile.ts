import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FileService } from '../../services/file.service';
import { JobseekerService } from '../../services/jobseeker.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobseeker-profile',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './jobseeker-profile.html',
  styleUrls: ['./jobseeker-profile.css']
})
export class JobseekerProfile implements OnInit {
  jobseeker: any;
  cvFile?: File;
  downloadUrl: string | null = null;
  jobseekerId: number;

  // Pour l'édition
  editMode = false;
  editedJobseeker: any = {};

  constructor(
    private fileService: FileService,
    private jobseekerService: JobseekerService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.jobseekerId = this.authService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.jobseekerService.getJobseekerById(this.jobseekerId).subscribe(data => {
      this.jobseeker = data;
      if (this.jobseeker.resume) {
        this.downloadUrl = `http://localhost:8081/api/files/resume/${this.jobseeker.resume}`;
      }
    });
  }

  // --------- Gestion édition profil ----------
  enableEdit() {
    this.editMode = true;
    this.editedJobseeker = { ...this.jobseeker };
  }

  cancelEdit() {
    this.editMode = false;
  }

  saveProfile() {
    this.jobseekerService.updateJobseeker(this.jobseekerId, this.editedJobseeker).subscribe({
      next: (data) => {
        this.jobseeker = data;
        this.editMode = false;
        this.toastr.success('Profil mis à jour avec succès !');
      },
      error: () => {
        this.toastr.error('Erreur lors de la mise à jour du profil');
      }
    });
  }

  // --------- Gestion du CV ----------
  onFileSelected(event: any): void {
    this.cvFile = event.target.files[0];
  }

  uploadCV(): void {
    if (!this.cvFile) return;
    this.fileService.uploadCV(this.jobseekerId, this.cvFile).subscribe(() => {
      this.toastr.success('CV envoyé avec succès !');
      window.location.reload();
    });
  }

  deleteCV(): void {
    if (!this.jobseeker.resume) return;
    this.fileService.deleteFile(this.jobseekerId, this.jobseeker.resume).subscribe(() => {
      this.toastr.success('CV supprimé avec succès !');
      window.location.reload();
    });
  }
}
