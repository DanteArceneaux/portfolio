import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type RiskReversalProps = {
  className?: string;
};

const items = [
  '2 revision rounds included',
  'Scope confirmed before coding',
  'Clean handoff (GitHub/ZIP + instructions)',
  'Mobile-first + accessible UI',
] as const;

export const RiskReversal = ({ className }: RiskReversalProps) => {
  return (
    <ul className={cn("grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};


