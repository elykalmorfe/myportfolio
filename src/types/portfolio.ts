export interface StoredFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
}

export interface Profile {
  name: string;
  headline: string;
  intro: string;
  photo: StoredFile | null;
  resume: StoredFile | null;
  resumeUrl: string;
  portfolioUrl: string;
}

export interface About {
  introduction: string;
  education: string;
  careerInterests: string;
  goals: string;
  personalInterests: string;
}

export interface ToolItem {
  id: string;
  name: string;
  logoUrl: string;
  logoFile: StoredFile | null;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  accomplishments: string[];
  images: StoredFile[];
}

export type AchievementCategory = 'internship' | 'pagpadayag' | 'recognition' | 'officer';

export interface Achievement {
  id: string;
  category: AchievementCategory;
  title: string;
  date: string;
  description: string;
  highlights: string[];
  files: StoredFile[];
  videoUrl: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  location: string;
  formEndpoint: string;
}

export interface PortfolioContent {
  profile: Profile;
  about: About;
  tools: ToolItem[];
  experiences: ExperienceEntry[];
  achievements: Achievement[];
  contact: ContactInfo;
}