import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { RiskReversal } from '@/components/conversion/RiskReversal';
import { Check, Clock, Zap } from 'lucide-react';

export const Services = () => {
  const fallbackFiverrHref = profile.socials.fiverrGig ?? profile.socials.fiverr;

  return (
    <Section id="services" className="bg-background">
      <div className="space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Services & Packages</h2>
          <p className="text-muted-foreground text-lg">
            Production-ready code delivered with legal precision.
          </p>
          <RiskReversal className="pt-2 text-left sm:text-center" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {profile.services.map((service, index) => (
            (() => {
              const orderHref = service.fiverrGigUrl ?? fallbackFiverrHref;
              return (
            <Card key={index} className="flex flex-col relative overflow-hidden border-white/10 hover:border-primary/50 transition-all duration-300">
               {index === 1 && (
                 <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                   POPULAR
                 </div>
               )}
              
              <div className="space-y-4 mb-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
                <div className="text-2xl font-bold text-foreground">{service.price}</div>
              </div>

              <div className="space-y-4 flex-grow">
                <div className="text-sm font-medium text-foreground">What's included:</div>
                <ul className="space-y-3">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Turnaround: <span className="text-foreground font-medium">{service.turnaround}</span></span>
                </div>
                <a href={orderHref} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full" variant={index === 1 ? 'primary' : 'outline'}>
                        Order Now
                    </Button>
                </a>
              </div>
            </Card>
              );
            })()
          ))}
        </div>
      </div>
    </Section>
  );
};

