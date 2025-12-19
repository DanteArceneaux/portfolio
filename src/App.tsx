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
        <div className="absolute top-[10%] left-[-15%] w-[50%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        {/* Mid-right accent glow (around Projects/Services) */}
        <div className="absolute top-[45%] right-[-20%] w-[45%] h-[35%] bg-accent/8 rounded-full blur-[140px]" />
        {/* Bottom-left glow (near Experience/Footer) */}
        <div className="absolute bottom-[5%] left-[-10%] w-[40%] h-[30%] bg-primary/6 rounded-full blur-[100px]" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-primary/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
          <Services />
        </div>
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <div className="relative">
          {/* Spotlight behind Projects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[50%] bg-gradient-to-b from-accent/8 to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
          <Projects />
        </div>
        <div className="section-divider" />
        <Faq />
        <div className="section-divider" />
        <div className="relative">
          <Skills />
        </div>
        <div className="section-divider" />
        <div className="relative">
          {/* Glow behind Experience */}
          <div className="absolute top-1/3 right-0 w-[40%] h-[50%] bg-primary/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
          <Experience />
        </div>
      </main>
      <Footer />
      <StickyHireCta />
    </div>
  );
}

export default App;
