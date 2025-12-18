import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import headshotUrl from '@/assets/headshot.png';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Scale } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Abstract Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px]" />
      </div>

      <Section className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-accent opacity-40 blur-sm" />
              <img
                src={headshotUrl}
                alt={`${profile.name} headshot`}
                className="relative w-14 h-14 rounded-full object-cover ring-1 ring-white/10"
              />
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a href={profile.socials.fiverr} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                Hire Me on Fiverr <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <Button variant="outline" size="lg" className="gap-2">
              View Portfolio <Terminal className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative hidden md:block"
        >
           <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full opacity-20 blur-3xl animate-pulse" />
              {/* Placeholder for Profile Image - using a div for now or an abstract code block */}
              <div className="relative w-full h-full bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl">
                 <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="ml-auto text-xs text-muted-foreground">profile.ts</div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="relative">
                     <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-accent opacity-35 blur-sm" />
                     <img
                       src={headshotUrl}
                       alt={`${profile.name} headshot`}
                       className="relative w-20 h-20 rounded-full object-cover ring-1 ring-white/10"
                     />
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
                    <div className="pl-4 flex gap-2">
                        <span className="text-primary">name:</span>
                        <span className="text-green-300">"Dante"</span>,
                    </div>
                    <div className="pl-4 flex gap-2">
                        <span className="text-primary">background:</span>
                        <span className="text-green-300">"J.D. Law"</span>,
                    </div>
                    <div className="pl-4 flex gap-2">
                        <span className="text-primary">stack:</span>
                        <span className="text-white">["React", "Tailwind"]</span>,
                    </div>
                    <div className="pl-4 flex gap-2">
                        <span className="text-primary">speed:</span>
                        <span className="text-green-300">"3x Faster"</span>
                    </div>
                    <div className="text-white">{`}`}</div>
                 </div>
              </div>
           </div>
        </motion.div>
      </Section>
    </div>
  );
};

