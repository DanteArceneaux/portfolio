import { Navbar } from '@/components/layout/Navbar';
import { StickyHireCta } from '@/components/layout/StickyHireCta';
import { Hero } from '@/features/hero/Hero';
import { Services } from '@/features/services/Services';
import { Process } from '@/features/process/Process';
import { Projects } from '@/features/projects/Projects';
import { Faq } from '@/features/faq/Faq';
import { About } from '@/features/about/About';
import { Skills } from '@/features/skills/Skills';
import { Experience } from '@/features/experience/Experience';
import { Footer } from '@/components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      {/* Add bottom padding on mobile so content isn't hidden behind the sticky CTA */}
      <main id="main" className="pb-20 md:pb-0">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <div className="bg-secondary/5">
          <Services />
        </div>
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <div className="bg-secondary/5">
          <Projects />
        </div>
        <div className="section-divider" />
        <Faq />
        <div className="section-divider" />
        <div className="bg-secondary/5">
          <Skills />
        </div>
        <div className="section-divider" />
        <Experience />
      </main>
      <Footer />
      <StickyHireCta />
    </div>
  );
}

export default App;
