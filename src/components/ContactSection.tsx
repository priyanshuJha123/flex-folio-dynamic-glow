
import { Send, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Assuming you have this component
import { Label } from '@/components/ui/label';
import { usePortfolioData } from '@/hooks/usePortfolioData';

const ContactSection = () => {
  const { data: portfolioData, isLoading, error } = usePortfolioData();

  // Formspree endpoint: replace with your own if you use Formspree
  // const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ID";

  // For Netlify forms, we just need the form attributes.

  const socialLinks = portfolioData ? [
    { href: portfolioData.contact.github, Icon: Github, label: 'GitHub' },
    { href: portfolioData.contact.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${portfolioData.contact.email}`, Icon: Mail, label: 'Email' },
  ] : [];
  
  if (portfolioData && portfolioData.contact.phone) {
    socialLinks.push({ href: `tel:${portfolioData.contact.phone}`, Icon: Phone, label: 'Phone' });
  }

  return (
    <section id="contact" className="bg-background py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold mb-4 text-primary">Contact Me</h3>
            <p className="text-muted-foreground mb-6">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              Feel free to reach out to me.
            </p>
            {isLoading && <p>Loading contact info...</p>}
            {error && <p className="text-destructive">Error loading contact info.</p>}
            {portfolioData && (
              <div className="space-y-4">
                <a href={`mailto:${portfolioData.contact.email}`} className="flex items-center text-foreground hover:text-primary">
                  <Mail className="h-5 w-5 mr-3 text-primary" /> {portfolioData.contact.email}
                </a>
                {portfolioData.contact.phone && (
                  <a href={`tel:${portfolioData.contact.phone}`} className="flex items-center text-foreground hover:text-primary">
                    <Phone className="h-5 w-5 mr-3 text-primary" /> {portfolioData.contact.phone}
                  </a>
                )}
                <div className="flex space-x-4 pt-4">
                  {socialLinks.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <link.Icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form 
            name="contact"
            method="POST" 
            data-netlify="true" 
            data-netlify-honeypot="bot-field"
            className="space-y-6 animate-fade-in-up" 
            style={{ animationDelay: '0.4s' }}
            action="/?success=true" // Optional: redirect on success
          >
            {/* Netlify spam protection */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out if you’re human: <input name="bot-field" />
              </label>
            </p>

            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</Label>
              <Input type="text" name="name" id="name" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</Label>
              <Input type="email" name="email" id="email" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="subject" className="block text-sm font-medium text-foreground">Subject</Label>
              <Input type="text" name="subject" id="subject" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="message" className="block text-sm font-medium text-foreground">Message</Label>
              <Textarea name="message" id="message" rows={4} required className="mt-1" />
            </div>
            <div>
              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-5 w-5" /> Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
