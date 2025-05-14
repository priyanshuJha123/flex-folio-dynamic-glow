
import { useQuery } from '@tanstack/react-query';

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  cgpa?: string;
}

export interface SkillEntry {
  name: string;
  icon: string; 
}

export interface SkillsCategory {
  programmingLanguages: SkillEntry[];
  webTechnologies: SkillEntry[];
  cloudAndFrameworks: SkillEntry[];
  softwareEngineering: SkillEntry[];
  softSkills: SkillEntry[];
}

export interface ProjectEntry {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveDemoLink?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface NavbarLink {
  label: string;
  href: string;
}

export interface PortfolioContact {
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  twitter?: string; // Kept optional if not used
}

export interface PortfolioData {
  name: string;
  profilePictureUrl: string;
  bio: string;
  contact: PortfolioContact;
  navbarLinks: NavbarLink[];
  education: EducationEntry[];
  skills: SkillsCategory;
  projects: ProjectEntry[];
  experience: ExperienceEntry[];
  footerText: string;
}

const fetchPortfolioData = async (): Promise<PortfolioData> => {
  const response = await fetch('/portfolioData.json');
  if (!response.ok) {
    console.error('Failed to fetch portfolio data:', response);
    throw new Error('Network response was not ok');
  }
  try {
    const data = await response.json();
    console.log('Fetched portfolio data:', data);
    return data;
  } catch (e) {
    console.error('Failed to parse portfolio data:', e);
    throw new Error('Failed to parse JSON');
  }
};

export const usePortfolioData = () => {
  return useQuery<PortfolioData, Error>({
    queryKey: ['portfolioData'],
    queryFn: fetchPortfolioData,
  });
};
