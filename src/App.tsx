import { Hero } from '@/features/hero/Hero';
import { About } from '@/features/about/About';
import { Skills } from '@/features/skills/Skills';
import { Experience } from '@/features/experience/Experience';
import { Footer } from '@/components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

export default App;
