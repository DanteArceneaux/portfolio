import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import type { ProcessStep } from '@/data/profile.types';
import { CheckCircle2, Clock, Send } from 'lucide-react';

export const Process = () => {
  const steps: ProcessStep[] = profile.processSteps ?? [];
  const fiverrHref = profile.socials.fiverrGig ?? profile.socials.fiverr;

  const icons = [Send, Clock, CheckCircle2] as const;

  return (
    <Section id="process" className="bg-background">
      <div className="space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold">A Simple, Fast Process</h2>
          <p className="text-muted-foreground text-lg">
            Clear scope, quick first draft, and a clean handoff. No chaos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = icons[index] ?? CheckCircle2;
            return (
              <Card key={step.title} className="space-y-4 border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Step <span className="text-foreground font-semibold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                    {step.meta}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={fiverrHref} target="_blank" rel="noopener noreferrer">
            <Button className="gap-2">
              Hire on Fiverr <Send className="h-4 w-4" />
            </Button>
          </a>
          <a href="#projects">
            <Button variant="outline">See work first</Button>
          </a>
        </div>
      </div>
    </Section>
  );
};



