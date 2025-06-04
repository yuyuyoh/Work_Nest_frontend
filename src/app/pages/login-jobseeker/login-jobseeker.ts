import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-jobseeker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-jobseeker.component.html',
  styleUrls: ['./login-jobseeker.css']
})
export class LoginJobseekerComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        const role = localStorage.getItem('role');
        if (role === 'EMPLOYER') {
          this.router.navigate(['/employer-dashboard']);
        } else if (role === 'CANDIDATE') {
          this.router.navigate(['/profile']);
        }
      },
      error: () => this.error = 'Email ou mot de passe incorrect'
    });
  }
}
