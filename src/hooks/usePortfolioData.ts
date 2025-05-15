import { useQuery } from '@tanstack/react-query';

// Define interfaces (EducationEntry, SkillEntry, etc.)
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
  twitter?: string;
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

// Function to fetch the portfolio data
const getPortfolioData = async (): Promise<PortfolioData> => {
  const response = await fetch('/portfolioData.json'); // Fetch from the public directory
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  // console.log('Fetched portfolio data:', data);
  return data as PortfolioData; // Cast to PortfolioData
};

export const usePortfolioData = () => {
  return useQuery<PortfolioData, Error>({
    queryKey: ['portfolioData'],
    queryFn: getPortfolioData,
    staleTime: Infinity, // Data is static, so can be considered fresh indefinitely
  });
};
