import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/lib/useActiveSection';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fiverrHref = profile.socials.fiverrGig ?? profile.socials.fiverr;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ];

  const activeSection = useActiveSection(navLinks.map((l) => l.href.replace('#', '')));

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4" 
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight z-50">
            Dante <span className="text-primary">.dev</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  activeSection === link.href.replace('#', '')
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-primary transition-opacity",
                    activeSection === link.href.replace('#', '') ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden="true"
                />
              </a>
            ))}
            <a href={fiverrHref} target="_blank" rel="noopener noreferrer">
              <Button size="sm">Hire on Fiverr</Button>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                className={cn(
                  "text-2xl font-bold transition-colors",
                  activeSection === link.href.replace('#', '')
                    ? "text-primary"
                    : "hover:text-primary"
                )}
              >
                {link.name}
              </a>
            ))}
            <a href={fiverrHref} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="mt-4">Hire on Fiverr</Button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

