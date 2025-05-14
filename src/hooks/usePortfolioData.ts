
import { useQuery } from '@tanstack/react-query';

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  cgpa?: string;
}

export interface SkillEntry {
  name: string;
  icon: string; // Placeholder for now, we'll map to actual icons later
}

export interface SkillsCategory {
  languages: SkillEntry[];
  tools: SkillEntry[];
  technologies: SkillEntry[];
}

export interface ProjectEntry {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveDemoLink?: string;
}

export interface NavbarLink {
  label: string;
  href: string;
}

export interface PortfolioData {
  name: string;
  profilePictureUrl: string;
  bio: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    twitter: string;
  };
  navbarLinks: NavbarLink[];
  education: EducationEntry[];
  skills: SkillsCategory;
  projects: ProjectEntry[];
  footerText: string;
}

const fetchPortfolioData = async (): Promise<PortfolioData> => {
  const response = await fetch('/portfolioData.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const usePortfolioData = () => {
  return useQuery<PortfolioData, Error>({
    queryKey: ['portfolioData'],
    queryFn: fetchPortfolioData,
  });
};

