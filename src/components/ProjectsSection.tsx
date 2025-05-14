
import { Github, ExternalLink } from 'lucide-react';
import { usePortfolioData, ProjectEntry } from '@/hooks/usePortfolioData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const { data: portfolioData, isLoading, error } = usePortfolioData();

  if (isLoading) return <section id="projects" className="py-16 md:py-24"><div className="container"><p>Loading projects...</p></div></section>;
  if (error || !portfolioData) {
    console.error("ProjectsSection Error:", error);
    return <section id="projects" className="py-16 md:py-24"><div className="container"><p>Error loading projects data. Check console.</p></div></section>;
  }

  return (
    <section id="projects" className="bg-background py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project: ProjectEntry, index: number) => (
            <Card 
              key={project.title} 
              className="flex flex-col animate-fade-in-up shadow-lg hover:shadow-xl transition-shadow duration-300" 
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sm text-muted-foreground mb-4">{project.description}</CardDescription>
                <div className="mb-4">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline" size="sm" asChild className="mr-2">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
                {project.liveDemoLink && (
                  <Button variant="default" size="sm" asChild>
                    <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
