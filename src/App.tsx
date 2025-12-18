import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/features/hero/Hero';
import { Services } from '@/features/services/Services';
import { Projects } from '@/features/projects/Projects';
import { About } from '@/features/about/About';
import { Skills } from '@/features/skills/Skills';
import { Experience } from '@/features/experience/Experience';
import { Footer } from '@/components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

export default App;
