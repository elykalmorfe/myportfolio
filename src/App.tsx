import React from 'react';
import { MotionConfig } from 'framer-motion';
import { AboutSection } from './components/about/AboutSection';
import { AchievementsSection } from './components/achievements/AchievementsSection';
import { ContactSection } from './components/contact/ContactSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { HeroSection } from './components/hero/HeroSection';
import { ResumePage } from './components/hero/ResumePage';
import { EditBanner } from './components/layout/EditBanner';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { SkillsSection } from './components/skills/SkillsSection';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { useHashRoute } from './hooks/useHashRoute';

export function App() {
  const hash = useHashRoute();
  const showResume = hash === '#resume';

  return (
    <PortfolioProvider>
      <MotionConfig reducedMotion="user">
        {showResume ?
        <ResumePage /> :

        <div className="min-h-screen w-full bg-canvas font-sans text-ink antialiased">
            <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas">
            
              Skip to content
            </a>
            <Navbar />
            <main id="main">
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ExperienceSection />
              <AchievementsSection />
              <ContactSection />
            </main>
            <Footer />
            <EditBanner />
          </div>
        }
      </MotionConfig>
    </PortfolioProvider>);

}