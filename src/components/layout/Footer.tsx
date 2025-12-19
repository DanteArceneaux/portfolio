import { profile } from '@/data/profile';
import { Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  const fiverrHref = profile.socials.fiverrGig ?? profile.socials.fiverr;

  return (
    <footer className="relative py-12 bg-background">
      {/* Gradient accent top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-display font-bold tracking-tight">Dante | The J.D. Developer</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Legal Precision. Coding Speed.
          </p>
        </div>

        <div className="flex gap-6">
          <a href={fiverrHref} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            Fiverr
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
           <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>

        <div className="text-sm text-muted-foreground text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} Dante.</p>
          <p className="text-xs mt-1">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

