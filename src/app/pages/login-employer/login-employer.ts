import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-employer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-employer.component.html'
})
export class LoginEmployerComponent {
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
          this.router.navigate(['/employer-dashboard']); // ou le dashboard de l'employeur
        } else if (role === 'CANDIDATE') {
          this.router.navigate(['/profile']); // ou le profil candidat
        }
      },
      error: () => this.error = 'Email ou mot de passe incorrect'
    });
  }
}
