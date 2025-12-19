import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { QuickQuoteModal } from '@/features/conversion/QuickQuoteModal';
import { RiskReversal } from '@/components/conversion/RiskReversal';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Building2, ChevronDown, Scale } from 'lucide-react';
import { useState } from 'react';

export const Hero = () => {
  // Served from /public so it has a stable URL (also used by social previews).
  // Use a smaller PNG fallback (Safari / non-WebP) for better performance.
  const headshotPng = '/headshot-512.png';
  const headshotWebp = '/headshot.webp';
  const fiverrHref = profile.socials.fiverrGig ?? profile.socials.fiverr;
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Abstract Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px]" />
        {/* Noise texture overlay for depth */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Section className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="space-y-6 pb-12 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-accent opacity-40 blur-sm" />
              <picture>
                <source srcSet={headshotWebp} type="image/webp" />
                <img
                  src={headshotPng}
                  alt={`${profile.name} headshot`}
                  width={56}
                  height={56}
                  loading="eager"
                  decoding="async"
                  className="relative w-14 h-14 rounded-full object-cover object-top ring-1 ring-white/10"
                />
              </picture>
            </div>
            <div className="leading-tight">
              <div className="font-semibold">{profile.name}</div>
              <div className="text-sm text-muted-foreground">
                {profile.title} • {profile.location}
              </div>
              <div className="text-sm text-muted-foreground">{profile.handle}</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary"
          >
            <Scale className="w-4 h-4" />
            <span>The J.D. Developer</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight"
          >
            Legal Precision. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Coding Speed.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg"
          >
            I convert Figma/screenshots into pixel-perfect React + Tailwind applications—fast, accessible, and contract-grade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-2"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground">
              <Building2 className="w-4 h-4 text-primary" />
              Fortune 500 (Cognizant)
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground">
              <BadgeCheck className="w-4 h-4 text-primary" />
              Meta Certified
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground">
              <Scale className="w-4 h-4 text-primary" />
              J.D., Univ. of Michigan
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 w-full"
          >
            <a href={fiverrHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="md" className="gap-2 text-base w-full sm:w-auto">
                Hire Me on Fiverr <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#projects" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="gap-2 text-base w-full sm:w-auto">
                View Work <ChevronDown className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-muted-foreground"
          >
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              Get a fast quote (copy a brief)
            </button>
            <span className="px-2" aria-hidden="true">•</span>
            <a href="#services" className="underline underline-offset-4 hover:text-foreground">
              See packages
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <RiskReversal className="pt-2" />
          </motion.div>
        </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block w-full max-w-full"
          >
             <div className="relative w-full aspect-square max-w-md mx-auto mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full opacity-20 blur-3xl animate-pulse" />
              {/* Code card with glow effect */}
              <div className="relative w-full h-full bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl shadow-primary/10" style={{ boxShadow: '0 0 80px rgba(59,130,246,0.12), 0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                 <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="ml-auto text-xs text-muted-foreground">profile.ts</div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="relative">
                     <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-accent opacity-35 blur-sm" />
                     <picture>
                       <source srcSet={headshotWebp} type="image/webp" />
                       <img
                         src={headshotPng}
                         alt={`${profile.name} headshot`}
                         width={80}
                         height={80}
                         loading="lazy"
                         decoding="async"
                         className="relative w-20 h-20 rounded-full object-cover object-top ring-1 ring-white/10"
                       />
                     </picture>
                   </div>
                   <div className="leading-tight">
                     <div className="text-xl font-semibold">{profile.name}</div>
                     <div className="text-sm text-muted-foreground">{profile.title}</div>
                     <div className="text-sm text-muted-foreground">{profile.handle}</div>
                   </div>
                 </div>
                 <div className="space-y-2 font-mono text-sm">
                    <div className="flex gap-2">
                        <span className="text-accent">const</span>
                        <span className="text-yellow-200">developer</span>
                        <span className="text-white">=</span>
                        <span className="text-white">{`{`}</span>
                    </div>
                    {[
                      { key: 'name', value: '"Dante"' },
                      { key: 'background', value: '"J.D. Law"' },
                      { key: 'stack', value: '["React", "Tailwind"]', isArray: true },
                      { key: 'speed', value: '"3x Faster"' },
                    ].map((line, i) => (
                      <motion.div
                        key={line.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.15 }}
                        className="pl-4 flex gap-2"
                      >
                        <span className="text-primary">{line.key}:</span>
                        <span className={line.isArray ? "text-white" : "text-green-300"}>{line.value}</span>
                        {!line.isArray && ','}
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      className="text-white"
                    >
                      {`}`}
                    </motion.div>
                 </div>
              </div>
           </div>
        </motion.div>
      </Section>

      <QuickQuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
};

