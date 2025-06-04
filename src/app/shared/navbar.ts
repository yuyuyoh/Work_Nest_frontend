import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  // Getter pour avoir le rôle toujours à jour
  get role(): string | null {
    return this.authService.getRole();
  }

  // Getter pour savoir si l'utilisateur est connecté
  get isLoggedIn(): boolean {
    return !!this.role;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
