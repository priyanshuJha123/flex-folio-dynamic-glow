
import { School } from 'lucide-react';
import { usePortfolioData, EducationEntry } from '@/hooks/usePortfolioData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Assuming you have Card components

const EducationSection = () => {
  const { data: portfolioData, isLoading, error } = usePortfolioData();

  if (isLoading) return <section id="education"><p>Loading education...</p></section>;
  if (error || !portfolioData) return <section id="education"><p>Error loading education data.</p></section>;

  return (
    <section id="education" className="bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">My Education</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.education.map((edu: EducationEntry, index: number) => (
            <Card key={index} className="animate-fade-in-up shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <School className="h-8 w-8 text-primary mr-3" />
                  <CardTitle className="text-xl font-semibold">{edu.degree}</CardTitle>
                </div>
                <CardDescription className="text-md text-muted-foreground">{edu.institution}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-1">Year: {edu.year}</p>
                {edu.cgpa && <p className="text-sm text-foreground">CGPA: {edu.cgpa}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

