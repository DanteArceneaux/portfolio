import { useMemo, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Clipboard, Sparkles } from 'lucide-react';
import {
  DESIGN_SOURCE_LABEL,
  PROJECT_TYPE_LABEL,
  buildFiverrMessage,
  buildScopeSummary,
  type Deadline,
  type DesignSource,
  type ProjectType,
  type ScopeState,
} from '@/features/conversion/scopeModel';

type QuickQuoteModalProps = {
  open: boolean;
  onClose: () => void;
};

export const QuickQuoteModal = ({ open, onClose }: QuickQuoteModalProps) => {
  const fiverrHref = profile.socials.fiverrGig ?? profile.socials.fiverr;

  const [projectType, setProjectType] = useState<ProjectType>('uiConversion');
  const [designSource, setDesignSource] = useState<DesignSource>('figma');
  const [designLink, setDesignLink] = useState<string>('');
  const [pagesOrSections, setPagesOrSections] = useState<number>(3);
  const [deadline, setDeadline] = useState<Deadline>('normal');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const scopeState: ScopeState = useMemo(
    () => ({
      projectType,
      designSource,
      pagesOrSections,
      deadline,
      // Defaults (kept simple for a “fast quote” flow)
      animations: 'basic',
      forms: 'none',
      deployment: true,
    }),
    [projectType, designSource, pagesOrSections, deadline]
  );

  const summary = useMemo(() => buildScopeSummary(scopeState), [scopeState]);

  const message = useMemo(
    () =>
      buildFiverrMessage({
        summary,
        designLink,
        notes,
      }),
    [summary, designLink, notes]
  );

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard may be blocked; fallback to selection-based copy
      try {
        const ta = document.createElement('textarea');
        ta.value = message;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        ta.remove();
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      } catch {
        setCopied(false);
      }
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Get a fast quote"
      description="Answer a few questions and copy a ready-to-send Fiverr message."
      className="max-w-5xl"
      footer={
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            Tip: Copy the message → open Fiverr → paste → send.
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="gap-2" onClick={copyMessage}>
              <Clipboard className="h-4 w-4" />
              {copied ? 'Copied' : 'Copy message'}
            </Button>
            <a href={fiverrHref} target="_blank" rel="noopener noreferrer">
              <Button className="gap-2 w-full sm:w-auto">
                Open Fiverr <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      }
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Card hover={false} className="border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Quick brief</div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Faster replies
            </span>
          </div>

          <div className="mt-5 space-y-5">
            <div className="space-y-2">
              <div className="text-sm font-semibold">Project type</div>
              <select
                className={cn(
                  "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                value={projectType}
                onChange={(e) => setProjectType(e.target.value as ProjectType)}
              >
                {Object.entries(PROJECT_TYPE_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-semibold">Design source</div>
                <select
                  className={cn(
                    "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                  value={designSource}
                  onChange={(e) => setDesignSource(e.target.value as DesignSource)}
                >
                  {Object.entries(DESIGN_SOURCE_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold">Deadline</div>
                <select
                  className={cn(
                    "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value as Deadline)}
                >
                  <option value="normal">Normal</option>
                  <option value="rush">Rush</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Sections/pages</div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={pagesOrSections}
                  onChange={(e) => setPagesOrSections(Number(e.target.value))}
                  className="w-full"
                />
                <div className="w-14 text-center rounded-md border border-white/10 bg-white/5 py-2 text-sm font-semibold">
                  {pagesOrSections}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Keep it simple. You can refine scope after the first reply.
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Design link (optional)</div>
              <input
                type="url"
                placeholder="Figma link / Drive link / Screenshot link"
                value={designLink}
                onChange={(e) => setDesignLink(e.target.value)}
                className={cn(
                  "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Notes (optional)</div>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything important: brand colors, example sites, must-have sections, etc."
                className={cn(
                  "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              />
            </div>
          </div>
        </Card>

        <Card hover={false} className="border-white/10 bg-secondary/20">
          <div className="text-sm font-semibold">Preview</div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-background/40 p-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Estimate
              </div>
              <div className="text-lg font-bold mt-1">{summary.priceText}</div>
              <div className="text-xs text-muted-foreground mt-1">{summary.timelineText}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-background/40 p-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Package
              </div>
              <div className="text-sm font-semibold mt-2">{summary.recommendedPackage}</div>
              <div className="text-xs text-muted-foreground mt-1">Preview only</div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-background/40 p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Copy/paste message
            </div>
            <pre className="mt-3 text-xs leading-relaxed overflow-auto max-h-[320px] rounded-lg bg-black/30 border border-white/10 p-3">
              <code className="text-muted-foreground whitespace-pre-wrap">{message}</code>
            </pre>
          </div>
        </Card>
      </div>
    </Modal>
  );
};


