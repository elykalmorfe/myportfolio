import { AchievementCategory } from '../types/portfolio';

export interface AchievementCategoryMeta {
  id: AchievementCategory;
  number: string;
  label: string;
  description: string;
  tint: string;
}

export const achievementCategories: AchievementCategoryMeta[] = [
{ id: 'internship', number: '01', label: 'Internship', description: 'Major professional milestone', tint: 'bg-peach' },
{ id: 'pagpadayag', number: '02', label: 'NEMSU PAGPADAYAG', description: 'Certificate and documentation', tint: 'bg-sage' },
{ id: 'recognition', number: '03', label: 'School Recognition', description: 'Academic recognitions', tint: 'bg-sky' },
{ id: 'officer', number: '04', label: 'School Officer', description: 'Student organization roles', tint: 'bg-lilac' }];