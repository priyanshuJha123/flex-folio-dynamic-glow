
import { Code, BriefcaseBusiness, Wrench, BrainCircuit, Github, Server, Palette, Router } from 'lucide-react'; // Added more icons
import { usePortfolioData, SkillEntry } from '@/hooks/usePortfolioData';
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component

// A simple mapping from string to Lucide icon component
// You might want to expand this or use a more robust solution
const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  Code: Code,
  Github: Github,
  Container: BriefcaseBusiness, // Placeholder, might need more specific like Docker icon
  Terminal: Wrench,
  React: BrainCircuit, // Placeholder for React, ideally a React logo icon
  Server: Server,
  Wind: Palette, // Placeholder for Tailwind
  Nextjs: Router // Placeholder for Next.js
  // Add more mappings as needed
};

const SkillCard = ({ title, skills, Icon }: { title: string, skills: SkillEntry[], Icon: React.FC<React.SVGProps<SVGSVGElement>> }) => (
  <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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

  if (isLoading) return <section id="skills"><p>Loading skills...</p></section>;
  if (error || !portfolioData) return <section id="skills"><p>Error loading skills data.</p></section>;

  const skills = portfolioData.skills;

  return (
    <section id="skills" className="bg-secondary/30 dark:bg-secondary/20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <SkillCard title="Languages" skills={skills.languages} Icon={Code} />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <SkillCard title="Tools" skills={skills.tools} Icon={Wrench} />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <SkillCard title="Technologies" skills={skills.technologies} Icon={BrainCircuit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

