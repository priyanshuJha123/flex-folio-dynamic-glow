
import Navbar from "@/components/Navbar";
import LandingSection from "@/components/LandingSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";

// Helper hook for intersection observer
const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerRef.current?.unobserve(entry.target); // Optional: unobserve after animation
        }
      });
    }, options);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observerRef.current?.observe(section));

    return () => {
      sections.forEach(section => observerRef.current?.unobserve(section));
    };
  }, [options]);
};


const Index = () => {
  useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <LandingSection />
        <EducationSection />
        <SkillsSection />
        {/* Projects and Contact sections will be added here later */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;

