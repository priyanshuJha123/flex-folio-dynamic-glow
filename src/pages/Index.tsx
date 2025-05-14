
import Navbar from "@/components/Navbar";
import LandingSection from "@/components/LandingSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";

// Helper hook for intersection observer
const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Ensure this runs only client-side
    if (typeof window === 'undefined') return;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, options);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observerRef.current?.observe(section));

    return () => {
      sections.forEach(section => {
        if (observerRef.current) { // Check if observerRef.current is not null
           observerRef.current.unobserve(section)
        }
      });
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
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
