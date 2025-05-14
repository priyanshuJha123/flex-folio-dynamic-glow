
import { Briefcase } from 'lucide-react';
import { usePortfolioData, ExperienceEntry } from '@/hooks/usePortfolioData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const ExperienceSection = () => {
  const { data: portfolioData, isLoading, error } = usePortfolioData();

  if (isLoading) return <section id="experience" className="py-16 md:py-24"><div className="container"><p>Loading experience...</p></div></section>;
  if (error || !portfolioData || !portfolioData.experience || portfolioData.experience.length === 0) {
    if (error) console.error("ExperienceSection Error:", error);
    // Don't render section or show error if no experience data or error
    return null; 
  }

  return (
    <section id="experience" className="bg-secondary/30 dark:bg-secondary/20 py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Work Experience</h2>
        <div className="space-y-8">
          {portfolioData.experience.map((exp: ExperienceEntry, index: number) => (
            <Card 
              key={exp.company} 
              className="animate-fade-in-up shadow-lg hover:shadow-xl transition-shadow duration-300" 
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">{exp.role}</CardTitle>
                    <CardDescription className="text-md text-primary">{exp.company}</CardDescription>
                  </div>
                  <div className="text-sm text-muted-foreground text-right">
                    <Briefcase className="inline h-4 w-4 mr-1 mb-0.5" />{exp.duration}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
