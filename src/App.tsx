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
        <div className="absolute top-[8%] left-[-22%] w-[70%] h-[45%] bg-primary/10 blur-[110px] md:left-[-18%] md:w-[55%] md:bg-primary/14 md:blur-[140px] rounded-full" />
        {/* Mid-right accent glow (around Projects/Services) */}
        <div className="absolute top-[42%] right-[-28%] w-[70%] h-[40%] bg-accent/8 blur-[120px] md:top-[40%] md:right-[-22%] md:w-[50%] md:bg-accent/12 md:blur-[150px] rounded-full" />
        {/* Bottom-left glow (near Experience/Footer) */}
        <div className="absolute bottom-[-5%] left-[-22%] w-[75%] h-[35%] bg-primary/8 blur-[120px] md:bottom-[0%] md:left-[-12%] md:w-[45%] md:bg-primary/10 md:blur-[130px] rounded-full" />
        {/* Center wash so the middle of the page isn't pure black */}
        <div className="hidden md:block absolute top-[30%] left-[15%] w-[70%] h-[40%] bg-primary/6 rounded-full blur-[180px]" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[70%] bg-primary/5 blur-[80px] md:w-[85%] md:h-[65%] md:bg-primary/7 md:blur-[90px] rounded-full pointer-events-none" aria-hidden="true" />
          <Services />
        </div>
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <div className="relative">
          {/* Spotlight behind Projects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[96%] h-[55%] bg-gradient-to-b from-accent/8 to-transparent blur-[90px] md:w-[92%] md:from-accent/10 md:blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
          <Projects />
        </div>
        <div className="section-divider" />
        <Faq />
        <div className="section-divider" />
        <div className="relative">
          {/* Subtle accent behind Skills so it doesn't feel like a dark drop-off */}
          <div className="hidden sm:block absolute top-1/2 left-0 -translate-y-1/2 w-[70%] h-[60%] bg-accent/5 blur-[110px] md:w-[55%] md:bg-accent/6 md:blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
          <Skills />
        </div>
        <div className="section-divider" />
        <div className="relative">
          {/* Glow behind Experience */}
          <div className="hidden sm:block absolute top-1/3 right-[-10%] w-[70%] h-[55%] bg-primary/5 blur-[90px] md:right-0 md:w-[45%] md:bg-primary/7 md:blur-[90px] rounded-full pointer-events-none" aria-hidden="true" />
          <Experience />
        </div>
      </main>
      <Footer />
      <StickyHireCta />
    </div>
  );
}

export default App;
