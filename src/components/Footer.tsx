
import { usePortfolioData } from '@/hooks/usePortfolioData';

const Footer = () => {
  const { data: portfolioData, isLoading, error } = usePortfolioData();

  if (isLoading || error || !portfolioData) return null;

  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container text-center text-muted-foreground">
        <p className="text-sm">{portfolioData.footerText}</p>
      </div>
    </footer>
  );
};

export default Footer;

