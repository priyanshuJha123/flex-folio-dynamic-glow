import { useQuery } from '@tanstack/react-query';
// Directly import the JSON data. Vite will handle this.
import portfolioContent from '/portfolioData.json'; 

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

// The data is now imported, so the query function can just resolve with it.
const getPortfolioData = async (): Promise<PortfolioData> => {
  // Simulate async behavior if needed by useQuery, or simply return the data.
  // For simplicity and since data is now static, we can directly use it.
  // console.log('Using imported portfolio data:', portfolioContent);
  return Promise.resolve(portfolioContent as PortfolioData);
};

export const usePortfolioData = () => {
  return useQuery<PortfolioData, Error>({
    queryKey: ['portfolioData'],
    queryFn: getPortfolioData,
    // Since the data is bundled, it's stale time can be infinite.
    staleTime: Infinity, 
  });
};
