
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { Button } from '@/components/ui/button';

const LandingSection = () => {
  const { data: portfolioData, isLoading, error } = usePortfolioData();

  if (isLoading) return <section id="home" className="min-h-screen flex items-center justify-center pt-16"><p>Loading...</p></section>;
  if (error || !portfolioData) {
    console.error("LandingSection Error:", error);
    return <section id="home" className="min-h-screen flex items-center justify-center pt-16"><p>Error loading data. Check console for details.</p></section>;
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
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-primary/20 dark:from-background dark:via-primary/10 dark:to-primary/30 pt-16 overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-500/20 dark:bg-pink-400/20 rounded-full blur-3xl"></div>
      
      <div className="container text-center relative z-10">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-blue-500/30 to-purple-500/40 rounded-full blur-md transform -rotate-6 scale-105"></div>
          <img
            src={portfolioData.profilePictureUrl}
            alt={portfolioData.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto relative z-10 shadow-2xl dark:shadow-primary/50 border-4 border-white dark:border-primary/70 object-cover animate-fade-in-up transform transition-all duration-300 ease-out hover:scale-110 hover:shadow-primary/40 dark:hover:shadow-primary/70 hover:ring-4 hover:ring-primary/60 dark:hover:ring-primary/60 ring-offset-background ring-offset-2"
            style={{ animationDelay: '0.2s' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = 'https://via.placeholder.com/150'; 
              console.warn(`Profile image not found at ${portfolioData.profilePictureUrl}, using placeholder. Please upload your image to public/profile.jpeg`);
            }}
          />
        </div>
        
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-up bg-gradient-to-r from-primary via-blue-500 to-purple-600 dark:from-blue-400 dark:via-primary dark:to-purple-400 bg-clip-text text-transparent"
          style={{ animationDelay: '0.4s' }}
        >
          Hi, I'm <span className="relative inline-block">
            {portfolioData.name}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 transform scale-x-100"></span>
          </span>
        </h1>
        
        <p 
          className="text-lg md:text-xl text-foreground dark:text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          {portfolioData.bio}
        </p>
        
        <div 
          className="flex justify-center space-x-2 sm:space-x-4 mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-foreground hover:text-primary p-3 rounded-full hover:bg-primary/10 transform transition-all duration-300 ease-in-out hover:scale-125 hover:rotate-6 active:scale-110 active:text-primary/80 group"
            >
              <link.Icon size={28} className="group-hover:stroke-[3px]" />
            </a>
          ))}
        </div>
        
        <div 
          className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: '1.0s' }}
        >
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-primary to-blue-600 dark:from-blue-500 dark:to-primary border-0 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 active:shadow-md"
          >
            <a href="#projects">View Projects</a>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="border-2 border-primary/50 dark:border-primary/50 bg-background/50 backdrop-blur-sm transform transition-all duration-300 ease-in-out hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 active:shadow-md"
          >
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
