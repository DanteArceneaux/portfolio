import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { profile } from '@/data/profile';
import { useMemo, useState } from 'react';
import { Code2, Play } from 'lucide-react';
import { AnalyticsDashboardDemo } from '@/features/projects/demos/AnalyticsDashboardDemo';
import { LandingLeadFormDemo } from '@/features/projects/demos/LandingLeadFormDemo';

export const Projects = () => {
  type DemoId = 'dashboard' | 'landing';
  type Project = (typeof profile.projects)[number] & { demoId: DemoId };

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const Demo = useMemo(() => {
    if (!activeProject) return null;
    switch (activeProject.demoId) {
      case 'dashboard':
        return <AnalyticsDashboardDemo />;
      case 'landing':
        return <LandingLeadFormDemo />;
      default:
        return null;
    }
  }, [activeProject]);

  return (
    <Section id="projects" className="bg-secondary/20">
      <div className="space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Selected Work</h2>
          <p className="text-muted-foreground text-lg">
            Real-world problems solved with clean, maintainable code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {profile.projects.map((project, index) => (
            <Card key={index} className="group overflow-hidden border-none bg-card/50 hover:bg-card/80 transition-all p-0 flex flex-col h-full">
              {/* Placeholder for Project Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative group-hover:opacity-90 transition-opacity flex items-center justify-center">
                 <Code2 className="w-16 h-16 text-white/10" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-4 bg-black/40 backdrop-blur-sm">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="gap-2 pointer-events-auto"
                      onClick={() => setActiveProject(project as Project)}
                    >
                      <Play className="w-4 h-4" /> Open Demo
                    </Button>
                 </div>
              </div>
              
              <div className="p-6 space-y-6 flex-grow flex flex-col">
                <div className="space-y-2">
                    <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{project.description}</p>
                </div>

                <div className="space-y-4 flex-grow">
                    <div className="grid grid-cols-1 gap-4 text-sm">
                        <div className="bg-white/5 p-3 rounded-lg space-y-1">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">The Challenge</span>
                            <p className="text-gray-300">{project.challenge}</p>
                        </div>
                         <div className="bg-primary/10 p-3 rounded-lg space-y-1">
                            <span className="text-xs uppercase tracking-wider text-primary font-semibold">The Solution</span>
                            <p className="text-gray-300">{project.solution}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tech.map((tech) => (
                    <span 
                        key={tech} 
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full gap-2 md:hidden"
                    onClick={() => setActiveProject(project as Project)}
                  >
                    <Play className="w-4 h-4" /> Open Demo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        open={!!activeProject}
        title={activeProject?.title ?? 'Project Demo'}
        description="These are lightweight, interactive demos embedded directly into my portfolio."
        onClose={() => setActiveProject(null)}
      >
        {Demo}
      </Modal>
    </Section>
  );
};

