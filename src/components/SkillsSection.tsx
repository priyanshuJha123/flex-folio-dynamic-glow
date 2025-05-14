import { Code, Palette, Database, Cloud, Container, BrainCircuit, BookOpen, Binary, IterationCw, Puzzle, Users, MessageSquare, Filter, BriefcaseBusiness, Wrench, Server, Router, Component, Github } from 'lucide-react';
import { usePortfolioData, SkillEntry, SkillsCategory } from '@/hooks/usePortfolioData';
import { Badge } from "@/components/ui/badge";

// A simple mapping from string to Lucide icon component
// You might want to expand this or use a more robust solution
const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  Code: Code,
  Palette: Palette, // for CSS
  Database: Database, // for MySQL
  Cloud: Cloud, // for AWS
  Container: Container, // for Docker
  BrainCircuit: BrainCircuit, // for TensorFlow, PyTorch
  BookOpen: BookOpen, // for OOP
  Binary: Binary, // for Data Structures
  IterationCw: IterationCw, // for Algorithms
  Puzzle: Puzzle, // for Problem-Solving
  Users: Users, // for Teamwork
  MessageSquare: MessageSquare, // for Communication
  Filter: Filter, // for Analytical Thinking
  React: BrainCircuit, // Placeholder for React, ideally a React logo icon (using BrainCircuit for now)
  Component: Component, // for Bootstrap
  // Keep existing generic ones if needed
  Github: Github, // Now correctly references the imported Github icon
  Server: Server,
  Wind: Palette, 
  Nextjs: Router,
  Terminal: Wrench,
  BriefcaseBusiness: BriefcaseBusiness,
};

const SkillCard = ({ title, skills, Icon }: { title: string, skills: SkillEntry[], Icon: React.FC<React.SVGProps<SVGSVGElement>> }) => (
  <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
    <div className="flex items-center mb-4">
      <Icon className="h-8 w-8 text-primary mr-3" />
      <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        const SkillIcon = iconMap[skill.icon] || Code; // Default to Code icon if not found
        return (
          <Badge key={skill.name} variant="secondary" className="text-sm px-3 py-1 flex items-center">
            <SkillIcon className="h-4 w-4 mr-1.5" />
            {skill.name}
          </Badge>
        );
      })}
    </div>
  </div>
);

const SkillsSection = () => {
  const { data: portfolioData, isLoading, error } = usePortfolioData();

  if (isLoading) return <section id="skills" className="py-16 md:py-24"><div className="container"><p>Loading skills...</p></div></section>;
  if (error || !portfolioData) {
    console.error("SkillsSection Error:", error);
    return <section id="skills" className="py-16 md:py-24"><div className="container"><p>Error loading skills data. Check console.</p></div></section>;
  }
  
  const skills = portfolioData.skills;

  const skillCategories = [
    { title: "Programming Languages", skills: skills.programmingLanguages, Icon: Code, delay: '0.2s' },
    { title: "Web Technologies", skills: skills.webTechnologies, Icon: Palette, delay: '0.3s' },
    { title: "Cloud & Frameworks", skills: skills.cloudAndFrameworks, Icon: Cloud, delay: '0.4s' },
    { title: "Software Engineering", skills: skills.softwareEngineering, Icon: BookOpen, delay: '0.5s' },
    { title: "Soft Skills", skills: skills.softSkills, Icon: Users, delay: '0.6s' },
  ];

  return (
    <section id="skills" className="bg-secondary/30 dark:bg-secondary/20 py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            category.skills && category.skills.length > 0 && (
              <div key={category.title} className="animate-fade-in-up" style={{ animationDelay: category.delay }}>
                <SkillCard title={category.title} skills={category.skills} Icon={category.Icon} />
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
