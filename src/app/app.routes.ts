import { Routes } from '@angular/router';
import { JobList } from './pages/job-list/job-list';
import { JobDetail } from './pages/job-detail/job-detail';
import { JobApplication } from './pages/job-application/job-application';
import { JobseekerProfile } from './pages/jobseeker-profile/jobseeker-profile';
import { MyApplications } from './pages/my-applications/my-applications';
import { LoginJobseekerComponent} from './pages/login-jobseeker/login-jobseeker';
import { AddJob } from './pages/add-job/add-job';
import { EmployerDashboard } from './pages/employer-dashboard/employer-dashboard';
import {RegisterComponent} from './pages/register/register.component'
import { AccountSecurityComponent } from './pages/account-security/account-security.component';


  export const routes: Routes = [
    {path: '', redirectTo: 'jobs', pathMatch: 'full'},
    {path: 'jobs', component: JobList},
    {path: 'jobs/:id', component: JobDetail},
    {path: 'apply/:id', component: JobApplication},
    {path: 'profile', component: JobseekerProfile},
    {path: 'applications', component: MyApplications},
    {path: 'login', component: LoginJobseekerComponent},
    {path: 'add-job', component: AddJob},
    {path: 'employer-dashboard', component: EmployerDashboard},
    {path: 'register', component: RegisterComponent},
    {path: 'account-security', component: AccountSecurityComponent}

  ];

