import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  name: string;
  level: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userType: 'jobseeker' | 'employer' = 'jobseeker';

  // Formulaire candidat
  form = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    education: '',
    specialty: '',
    experiences: [] as WorkExperience[],
    skills: [] as Skill[]
  };

  // Formulaire employeur
  employerForm = {
    name: '',
    email: '',
    password: '',
    phone: '',
    industry: '',
    address: '',
    description: ''
  };

  // Pour l'ajout dynamique d'expérience et compétence
  experience: WorkExperience = { title: '', company: '', startDate: '', endDate: '', description: '' };
  skill: Skill = { name: '', level: '' };

  isLoading = false;
  success = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  // Candidat: Ajouter expérience
  addExperience() {
    if (this.experience.title && this.experience.startDate) {
      this.form.experiences.push({ ...this.experience });
      this.experience = { title: '', company: '', startDate: '', endDate: '', description: '' };
    }
  }

  removeExperience(i: number) {
    this.form.experiences.splice(i, 1);
  }

  // Candidat: Ajouter compétence
  addSkill() {
    if (this.skill.name && this.skill.level) {
      this.form.skills.push({ ...this.skill });
      this.skill = { name: '', level: '' };
    }
  }

  removeSkill(i: number) {
    this.form.skills.splice(i, 1);
  }

  // Soumission du formulaire
  onSubmit() {
    this.isLoading = true;
    this.success = false;
    this.error = null;

    if (this.userType === 'jobseeker') {
      this.http.post('/api/users/jobseekers', this.form).subscribe({
        next: () => {
          this.isLoading = false;
          this.success = true;
        },
        error: (err) => {
          this.isLoading = false;
          this.error = err.error?.message || "Erreur lors de l'inscription";
        }
      });
    } else {
      this.http.post('/api/users/employers', this.employerForm).subscribe({
        next: () => {
          this.isLoading = false;
          this.success = true;
        },
        error: (err) => {
          this.isLoading = false;
          this.error = err.error?.message || "Erreur lors de l'inscription";
        }
      });
    }
  }
}
