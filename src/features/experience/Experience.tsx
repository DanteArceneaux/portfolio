import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';
import { Briefcase, GraduationCap, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Experience = () => {
  // State to track expanded items by index
  const [expandedItems, setExpandedItems] = useState<number[]>([0]); // Default first one open

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <Section id="experience">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Work Experience */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>

          <div className="space-y-6">
            {profile.experience.map((job, index) => {
               const isExpanded = expandedItems.includes(index);
               // Take first 2 bullets as preview
               const previewBullets = job.achievements.slice(0, 2);
               const hiddenBullets = job.achievements.slice(2);

               return (
                  <Card key={index} className="space-y-4 border-l-4 border-l-primary p-6 relative">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h3 className="text-xl font-bold">{job.role}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-primary font-medium">
                            <span>{job.company}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="text-sm text-muted-foreground font-normal">{job.location}</span>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded whitespace-nowrap">
                        {job.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground italic">{job.description}</p>
                    
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground/90 marker:text-primary">
                      {previewBullets.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground/90 marker:text-primary pt-2">
                                    {hiddenBullets.map((achievement, i) => (
                                        <li key={`hidden-${i}`}>{achievement}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {hiddenBullets.length > 0 && (
                        <button 
                            onClick={() => toggleExpand(index)}
                            className="flex items-center gap-1 text-xs text-primary font-medium hover:underline mt-2 focus:outline-none"
                        >
                            {isExpanded ? (
                                <>Show Less <ChevronUp className="w-3 h-3" /></>
                            ) : (
                                <>Show More Details <ChevronDown className="w-3 h-3" /></>
                            )}
                        </button>
                    )}
                  </Card>
               );
            })}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="space-y-12">
          {/* Education */}
          <div className="space-y-8">
             <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-accent" />
                <h2 className="text-3xl font-bold">Education</h2>
             </div>
             <div className="space-y-4">
                {profile.education.map((edu, index) => (
                    <Card key={index} className="flex justify-between items-center group hover:border-accent/50 transition-colors">
                        <div>
                            <h3 className="font-bold">{edu.school}</h3>
                            <p className="text-sm text-muted-foreground">{edu.degree}</p>
                        </div>
                        <span className="text-sm text-muted-foreground/70 group-hover:text-accent transition-colors">
                            {edu.year}
                        </span>
                    </Card>
                ))}
             </div>
          </div>

          {/* Certifications */}
          <div className="space-y-8">
             <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-yellow-500" />
                <h2 className="text-3xl font-bold">Certifications</h2>
             </div>
             <div className="space-y-4">
                {profile.certifications.map((cert, index) => (
                    <Card key={index} className="space-y-1 hover:border-yellow-500/50 transition-colors">
                        <h3 className="font-bold">{cert.name}</h3>
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{cert.issuer}</span>
                            <span>{cert.year}</span>
                        </div>
                    </Card>
                ))}
             </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
