import { profile } from '@/data/profile';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from 'lucide-react';

export const StickyHireCta = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <a
          href={profile.socials.fiverr}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button className="w-full gap-2">
            Hire on Fiverr <ArrowUpRight className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </div>
  );
};



