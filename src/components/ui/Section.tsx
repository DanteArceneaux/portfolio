import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Section = ({ children, id, className, ...props }: SectionProps) => {
  return (
    <section 
      id={id} 
      className={cn("py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto", className)}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </section>
  );
};

