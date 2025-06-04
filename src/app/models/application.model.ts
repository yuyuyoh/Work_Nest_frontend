import {Job} from './job.model'
import {Jobseeker} from './jobseeker.model'

export interface Application {
  id?: number;
  jobId: number;
  jobseekerId: number;
  message: string;
  submittedAt?: Date;
  status: 'EN_ATTENTE' | 'ACCEPTEE' | 'REFUSEE';
  applicationDate: Date;
  job?: Job;
  jobseekerCV: string;
  jobseekerFirstName: string;
  jobseekerLastName: string;
  jobseekerEmail: string;
  jobseekerPhone :string;
  appliedAt: string;
}
