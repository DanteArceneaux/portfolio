import { Section } from '@/components/ui/Section';
import { profile } from '@/data/profile';
import { motion } from 'framer-motion';

export const Skills = () => {
  return (
    <Section id="skills" className="bg-background/50">
      <div className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Technical Arsenal</h2>
        
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {profile.skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full bg-secondary border border-white/5 text-secondary-foreground font-medium cursor-default hover:border-primary/50 hover:text-primary transition-colors"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

