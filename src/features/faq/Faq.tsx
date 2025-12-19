import { useId, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';
import type { FaqItem } from '@/data/profile.types';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Faq = () => {
  const faq: FaqItem[] = profile.faq ?? [];
  const baseId = useId();

  // Keep it simple: one open at a time (best for scanning)
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <Section id="faq">
      <div className="space-y-12 max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold">FAQ</h2>
          <p className="text-muted-foreground text-lg">
            Quick answers to the questions clients ask most often.
          </p>
        </div>

        <div className="space-y-4">
          {faq.map((item, index) => {
            const isOpen = index === openIndex;
            const buttonId = `${baseId}-faq-btn-${index}`;
            const panelId = `${baseId}-faq-panel-${index}`;

            return (
              <Card key={item.q} hover={false} className="border-white/10">
                <button
                  id={buttonId}
                  type="button"
                  className="w-full flex items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <div className="text-lg font-semibold">{item.q}</div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform",
                      isOpen ? "rotate-180" : "rotate-0"
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 text-muted-foreground leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
};



