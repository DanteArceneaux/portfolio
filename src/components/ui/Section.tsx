import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Section = ({ children, id, className, ...props }: SectionProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id={id} 
      // scroll-mt ensures anchor links don't get hidden behind the fixed navbar
      className={cn("scroll-mt-24 py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto", className)}
      {...props}
    >
      {prefersReducedMotion ? (
        <div>{children}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
};

