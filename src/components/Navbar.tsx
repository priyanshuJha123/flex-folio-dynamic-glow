
import { useState } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { usePortfolioData, NavbarLink } from '@/hooks/usePortfolioData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: portfolioData, isLoading, error } = usePortfolioData();

  if (isLoading) return null; // Or a loading skeleton
  if (error || !portfolioData) return <div>Error loading navigation data.</div>;

  const navLinks = portfolioData.navbarLinks;

  return (
    <nav className="bg-background/80 backdrop-blur-md shadow-sm fixed w-full z-50 top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#home" className="flex-shrink-0 flex items-center group">
              <Code className="h-8 w-8 text-primary group-hover:animate-pulse" />
              <span className="ml-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {portfolioData.name.split(' ')[0]}
              </span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link: NavbarLink) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <ThemeToggle />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-background inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ml-2"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <X className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link: NavbarLink) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

