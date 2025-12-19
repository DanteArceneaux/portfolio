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
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Ambient lighting layer - carries Hero energy throughout */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top-left glow (extends from Hero) */}
        <div className="absolute top-[8%] left-[-18%] w-[55%] h-[45%] bg-primary/14 rounded-full blur-[140px]" />
        {/* Mid-right accent glow (around Projects/Services) */}
        <div className="absolute top-[40%] right-[-22%] w-[50%] h-[40%] bg-accent/12 rounded-full blur-[150px]" />
        {/* Bottom-left glow (near Experience/Footer) */}
        <div className="absolute bottom-[0%] left-[-12%] w-[45%] h-[35%] bg-primary/10 rounded-full blur-[130px]" />
        {/* Center wash so the middle of the page isn't pure black */}
        <div className="absolute top-[30%] left-[15%] w-[70%] h-[40%] bg-primary/6 rounded-full blur-[180px]" />
      </div>

      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      {/* Add bottom padding on mobile so content isn't hidden behind the sticky CTA */}
      <main id="main" className="relative z-10 pb-20 md:pb-0">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <div className="relative">
          {/* Subtle glow behind Services */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[65%] bg-primary/7 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
          <Services />
        </div>
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <div className="relative">
          {/* Spotlight behind Projects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[92%] h-[55%] bg-gradient-to-b from-accent/10 to-transparent rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
          <Projects />
        </div>
        <div className="section-divider" />
        <Faq />
        <div className="section-divider" />
        <div className="relative">
          {/* Subtle accent behind Skills so it doesn't feel like a dark drop-off */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[55%] h-[60%] bg-accent/6 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
          <Skills />
        </div>
        <div className="section-divider" />
        <div className="relative">
          {/* Glow behind Experience */}
          <div className="absolute top-1/3 right-0 w-[45%] h-[55%] bg-primary/7 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
          <Experience />
        </div>
      </main>
      <Footer />
      <StickyHireCta />
    </div>
  );
}

export default App;
