import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

type SectionProps = Omit<HTMLMotionProps<'section'>, 'ref'> & {
  children: React.ReactNode;
};

export const Section = ({ children, id, className, ...props }: SectionProps) => {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true } as const,
        transition: { duration: 0.5 },
      };

  return (
    <motion.section
      id={id}
      // scroll-mt ensures anchor links don't get hidden behind the fixed navbar
      className={cn("scroll-mt-24 py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto", className)}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.section>
  );
};

