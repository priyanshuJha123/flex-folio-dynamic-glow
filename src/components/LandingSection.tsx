
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { Button } from '@/components/ui/button';
// Removed useTheme as it's not used here

const LandingSection = () => {
  const { data: portfolioData, isLoading, error } = usePortfolioData();

  if (isLoading) return <section id="home" className="min-h-screen flex items-center justify-center"><p>Loading...</p></section>;
  if (error || !portfolioData) {
    console.error("LandingSection Error:", error);
    return <section id="home" className="min-h-screen flex items-center justify-center"><p>Error loading data. Check console for details.</p></section>;
  }
  
  const socialLinks = [
    { href: portfolioData.contact.github, Icon: Github, label: 'GitHub' },
    { href: portfolioData.contact.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${portfolioData.contact.email}`, Icon: Mail, label: 'Email' },
  ];
  if (portfolioData.contact.phone) {
    socialLinks.push({ href: `tel:${portfolioData.contact.phone}`, Icon: Phone, label: 'Phone' });
  }


  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 dark:to-secondary/20 pt-16">
      <div className="container text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <img
          src={portfolioData.profilePictureUrl}
          alt={portfolioData.name}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 shadow-lg border-4 border-primary/20 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop if placeholder also fails
            target.src = 'https://via.placeholder.com/150'; // Fallback placeholder
            console.warn(`Profile image not found at ${portfolioData.profilePictureUrl}, using placeholder. Please upload your image to public/profile.jpeg`);
          }}
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          Hi, I'm <span className="text-primary">{portfolioData.name}</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {portfolioData.bio}
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <link.Icon size={28} />
            </a>
          ))}
        </div>
        <div>
          <Button asChild size="lg" className="mr-4">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
