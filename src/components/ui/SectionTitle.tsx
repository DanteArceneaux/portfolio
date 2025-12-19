import React from 'react';
import { cn } from '@/lib/utils';

type SectionTitleProps = {
  title: string;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

/**
 * Consistent section heading motif used across the site.
 * This helps maintain “visual rhythm” so the page feels designed from top to bottom,
 * not just a strong Hero followed by plain sections.
 */
export const SectionTitle = ({
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
}: SectionTitleProps) => {
  const isCenter = align === 'center';

  return (
    <div className={cn(isCenter ? 'text-center' : 'text-left', 'space-y-4', className)}>
      <div className={cn('w-fit', isCenter && 'mx-auto')}>
        <h2 className={cn('text-3xl md:text-4xl font-display font-bold tracking-tight', titleClassName)}>
          {title}
        </h2>
        {/* Accent motif */}
        <div
          aria-hidden="true"
          className={cn(
            'mt-3 h-1 w-16 rounded-full',
            'bg-gradient-to-r from-primary/80 via-accent/60 to-transparent',
            isCenter && 'mx-auto'
          )}
        />
      </div>

      {subtitle ? (
        <div className={cn('text-muted-foreground text-lg', subtitleClassName)}>{subtitle}</div>
      ) : null}
    </div>
  );
};


