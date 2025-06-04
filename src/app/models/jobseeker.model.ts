import { Skill } from './skill.model';
import { WorkExperience } from './work-experience.model';

export interface Jobseeker {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  skills: Skill[];
  workExperiences: WorkExperience[];
  resume?: string;
  imageFilename?: string;
}
