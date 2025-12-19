import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { profile } from '@/data/profile';
import { Scale, Zap, ShieldCheck } from 'lucide-react';

export const About = () => {
  const iconMap = {
    Reliability: ShieldCheck,
    Speed: Zap,
    Quality: Scale,
  };

  return (
    <Section id="about">
      <div className="space-y-12">
        <SectionTitle
          title='Why Hire The "J.D." Developer?'
          subtitle="I combine the reliability of a legal professional with the speed of a modern AI-augmented developer."
          className="max-w-3xl mx-auto"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {profile.whyHireMe.map((item, index) => {
            const Icon = iconMap[item.title as keyof typeof iconMap] || Scale;
            return (
              <Card key={index} className="flex flex-col items-center text-center space-y-4 p-8">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h3 className="text-2xl font-bold">About Me</h3>
                {profile.bio.map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </div>
             <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center bg-secondary/50 border-none">
                    <div className="text-3xl font-bold text-primary">2+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                </Card>
                <Card className="p-4 text-center bg-secondary/50 border-none">
                    <div className="text-3xl font-bold text-primary">F500</div>
                    <div className="text-sm text-muted-foreground">Enterprise Experience</div>
                </Card>
                <Card className="p-4 text-center bg-secondary/50 border-none">
                    <div className="text-3xl font-bold text-primary">J.D.</div>
                    <div className="text-sm text-muted-foreground">Univ. of Michigan</div>
                </Card>
                 <Card className="p-4 text-center bg-secondary/50 border-none">
                    <div className="text-3xl font-bold text-primary">Meta</div>
                    <div className="text-sm text-muted-foreground">Certified</div>
                </Card>
            </div>
        </div>
      </div>
    </Section>
  );
};

