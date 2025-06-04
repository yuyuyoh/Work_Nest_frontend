export interface Job {
  id?: number;
  title: string;
  description: string;
  qualifications: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  postedAt?: Date;
  employerId?: number;
  type: string;
  experience:string;
  vacancies : string;
}
