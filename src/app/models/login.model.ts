export interface LoginRequest {
  email: string;
  password: string;
  token: string;
  userId: number;
  role: string;
}

export interface LoginResponse {
  token: string;
  role: 'JOBSEEKER' | 'EMPLOYER' | 'ADMIN';
  userId: number;
}
