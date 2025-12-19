import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className, hover = true, ...props }: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : undefined}
      className={cn(
        "bg-card/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-xl shadow-black/25",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
