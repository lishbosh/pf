export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  details: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  summary: string;
  link: string;
};

export type CertificationItem = {
  id: string;
  name: string;
  issuer: string;
  year: string;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
};

export type ReminderSetting = {
  remindEveryDays: number;
  lastReminder?: string;
};

export type PortfolioData = {
  name: string;
  title: string;
  about: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  contactEmail: string;
  contactPhone: string;
  location: string;
  socials: SocialLink[];
  certifications: CertificationItem[];
  profilePhotoId?: string;
};

export type ResumeData = {
  personal: {
    fullName: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  skills: string[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  languages: string[];
  hobbies: string[];
  photoOptional?: string;
};

export type TemplateMeta = {
  id: string;
  name: string;
  accent: string;
  background: string;
  description: string;
  layout: "split" | "stacked" | "columns" | "hero" | "minimal";
};

