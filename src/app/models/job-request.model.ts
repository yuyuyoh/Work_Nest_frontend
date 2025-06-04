export interface JobRequest {
  title: string;
  description: string;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  type: string;          // "FULL_TIME", "PART_TIME", "FREELANCE"
  employerId: number;
  experience?: number;
  vacancies?: number;
}
