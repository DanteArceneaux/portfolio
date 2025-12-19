import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';
import {
  AlertTriangle,
  BadgeCheck,
  Clipboard,
  Download,
  FileText,
  Gavel,
  Sparkles,
} from 'lucide-react';

type ProjectType = 'uiConversion' | 'landingPage' | 'dashboard' | 'bugfix';
type DesignSource = 'figma' | 'screenshots' | 'none';
type Animations = 'none' | 'basic' | 'premium';
type Forms = 'none' | 'simple' | 'advanced';
type Deadline = 'normal' | 'rush';

type State = {
  projectType: ProjectType;
  designSource: DesignSource;
  pagesOrSections: number;
  animations: Animations;
  forms: Forms;
  deployment: boolean;
  deadline: Deadline;
};

const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  uiConversion: 'UI Conversion (Figma → React/Tailwind)',
  landingPage: 'Landing Page',
  dashboard: 'Dashboard',
  bugfix: 'Bug Fix / Refactor',
};

const DESIGN_SOURCE_LABEL: Record<DesignSource, string> = {
  figma: 'Figma file available',
  screenshots: 'Screenshots only',
  none: 'No design yet (needs guidance)',
};

const ANIMATION_LABEL: Record<Animations, string> = {
  none: 'None',
  basic: 'Basic',
  premium: 'Premium',
};

const FORMS_LABEL: Record<Forms, string> = {
  none: 'None',
  simple: 'Simple',
  advanced: 'Advanced',
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function formatUSD(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function plural(n: number, singular: string, pluralWord = `${singular}s`) {
  return n === 1 ? singular : pluralWord;
}

function getBase(service: ProjectType) {
  switch (service) {
    case 'uiConversion':
      return { min: 99, max: 199, daysMin: 2, daysMax: 3, packageName: 'Rapid UI Conversion' };
    case 'landingPage':
      return { min: 249, max: 449, daysMin: 3, daysMax: 5, packageName: 'Landing Page Build' };
    case 'dashboard':
      return { min: 399, max: 799, daysMin: 5, daysMax: 9, packageName: 'Custom Dashboard' };
    case 'bugfix':
      return { min: 79, max: 199, daysMin: 1, daysMax: 3, packageName: 'Bug Fix & Refactor' };
  }
}

function buildScopeText(summary: ReturnType<typeof buildSummary>) {
  const lines: string[] = [];
  lines.push(`SCOPE SUMMARY (Draft)`);
  lines.push(`----------------------------------------`);
  lines.push(`Project Type: ${summary.projectTypeLabel}`);
  lines.push(`Design Source: ${summary.designSourceLabel}`);
  lines.push(`Sections/Pages: ${summary.pagesOrSections}`);
  lines.push(`Animations: ${summary.animationsLabel}`);
  lines.push(`Forms: ${summary.formsLabel}`);
  lines.push(`Deployment: ${summary.deployment ? 'Yes' : 'No'}`);
  lines.push(`Deadline: ${summary.deadline === 'rush' ? 'Rush' : 'Normal'}`);
  lines.push('');
  lines.push(`ESTIMATE (Preview)`);
  lines.push(`----------------------------------------`);
  lines.push(`Recommended Package: ${summary.recommendedPackage}`);
  lines.push(`Estimated Timeline: ${summary.timelineText}`);
  lines.push(`Estimated Price Range: ${summary.priceText}`);
  lines.push('');
  lines.push(`DELIVERABLES`);
  lines.push(`----------------------------------------`);
  for (const d of summary.deliverables) lines.push(`- ${d}`);
  if (summary.risks.length > 0) {
    lines.push('');
    lines.push(`RISK FLAGS`);
    lines.push(`----------------------------------------`);
    for (const r of summary.risks) lines.push(`- ${r}`);
  }
  lines.push('');
  lines.push(`NEXT STEP`);
  lines.push(`----------------------------------------`);
  lines.push(`Send this scope to me on Fiverr: ${profile.socials.fiverr}`);
  return lines.join('\n');
}

function buildSummary(state: State) {
  const base = getBase(state.projectType);

  // Pricing model: deliberately simple and transparent (good for Fiverr buyers)
  let min = base.min;
  let max = base.max;
  let daysMin = base.daysMin;
  let daysMax = base.daysMax;

  // Complexity based on sections/pages
  const extraUnits = Math.max(0, state.pagesOrSections - (state.projectType === 'bugfix' ? 1 : 3));
  min += extraUnits * 20;
  max += extraUnits * 45;
  daysMin += Math.ceil(extraUnits / 3);
  daysMax += Math.ceil(extraUnits / 2);

  // Animations
  if (state.animations === 'basic') {
    min += 40;
    max += 80;
    daysMax += 1;
  }
  if (state.animations === 'premium') {
    min += 80;
    max += 160;
    daysMin += 1;
    daysMax += 2;
  }

  // Forms
  if (state.forms === 'simple') {
    min += 35;
    max += 70;
    daysMax += 1;
  }
  if (state.forms === 'advanced') {
    min += 75;
    max += 150;
    daysMin += 1;
    daysMax += 2;
  }

  // Deployment
  if (state.deployment) {
    min += 25;
    max += 50;
  }

  // Design source affects risk + timeline
  const risks: string[] = [];
  if (state.designSource === 'screenshots') {
    risks.push('Screenshots only: expect minor interpretation decisions + extra review.');
    daysMax += 1;
  }
  if (state.designSource === 'none') {
    risks.push('No design yet: scope may change as we finalize layout and components.');
    daysMax += 2;
    max += 120;
  }

  // Rush multiplier
  if (state.deadline === 'rush') {
    risks.push('Rush deadline: limited revision bandwidth; scope must be very clear.');
    min = Math.round(min * 1.25);
    max = Math.round(max * 1.25);
    daysMin = Math.max(1, Math.floor(daysMin * 0.75));
    daysMax = Math.max(daysMin, Math.floor(daysMax * 0.85));
  }

  // Deliverables
  const deliverablesBase = [
    'Responsive layout (mobile → desktop)',
    'Clean component structure (React + TypeScript)',
    'Tailwind styling with consistent spacing + typography',
    'Accessible UI basics (labels, focus states)',
    'Professional handoff (run/build instructions)',
  ];
  const deliverables: string[] = [...deliverablesBase];
  if (state.projectType === 'landingPage') deliverables.push('Conversion-friendly sections (hero, benefits, CTA, etc.)');
  if (state.projectType === 'dashboard') deliverables.push('Interactive UI (filters, tables, and chart skeleton)');
  if (state.animations !== 'none') deliverables.push('Polished animations (Framer Motion)');
  if (state.forms !== 'none') deliverables.push('Form validation + success state');
  if (state.deployment) deliverables.push('Deploy to Netlify/Vercel');

  const timelineText = `${daysMin}–${daysMax} ${plural(daysMax, 'day')}`;
  const priceText = `${formatUSD(min)} – ${formatUSD(max)}`;

  return {
    ...state,
    recommendedPackage: base.packageName,
    priceText,
    timelineText,
    deliverables,
    risks,
    projectTypeLabel: PROJECT_TYPE_LABEL[state.projectType],
    designSourceLabel: DESIGN_SOURCE_LABEL[state.designSource],
    animationsLabel: ANIMATION_LABEL[state.animations],
    formsLabel: FORMS_LABEL[state.forms],
  };
}

export const ScopeBuilderDemo = () => {
  const [step, setStep] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const [state, setState] = useState<State>({
    projectType: 'uiConversion',
    designSource: 'figma',
    pagesOrSections: 3,
    animations: 'basic',
    forms: 'none',
    deployment: true,
    deadline: 'normal',
  });

  const summary = useMemo(() => buildSummary(state), [state]);
  const scopeText = useMemo(() => buildScopeText(summary), [summary]);

  const totalSteps = 3;

  async function copyScope() {
    try {
      await navigator.clipboard.writeText(scopeText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback: do nothing (clipboard blocked)
      setCopied(false);
    }
  }

  function downloadScope() {
    const blob = new Blob([scopeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scope-summary.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Interactive Demo</div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Gavel className="h-6 w-6 text-primary" />
            Contract‑Grade Scope Builder
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Answer a few questions and get a clean scope summary, price range, and timeline—ready to send on Fiverr.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
            Step <span className="text-foreground font-semibold">{step + 1}</span> / {totalSteps}
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Wow Factor: High
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Wizard */}
        <Card hover={false} className="border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Build your scope</div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={step === 0}
                onClick={() => setStep((s) => clamp(s - 1, 0, totalSteps - 1))}
              >
                Back
              </Button>
              <Button
                size="sm"
                disabled={step === totalSteps - 1}
                onClick={() => setStep((s) => clamp(s + 1, 0, totalSteps - 1))}
              >
                Next
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {step === 0 ? (
                <>
                  <FieldLabel label="What do you need built?" />
                  <OptionGrid<ProjectType>
                    value={state.projectType}
                    onChange={(v) => setState((p) => ({ ...p, projectType: v }))}
                    options={[
                      { value: 'uiConversion', title: 'UI Conversion', description: 'Figma → React/Tailwind' },
                      { value: 'landingPage', title: 'Landing Page', description: 'High-converting marketing page' },
                      { value: 'dashboard', title: 'Dashboard', description: 'Interactive UI + data views' },
                      { value: 'bugfix', title: 'Bug Fix / Refactor', description: 'Clean up + performance' },
                    ]}
                  />

                  <FieldLabel label="Do you have a design file?" />
                  <OptionGrid<DesignSource>
                    value={state.designSource}
                    onChange={(v) => setState((p) => ({ ...p, designSource: v }))}
                    options={[
                      { value: 'figma', title: 'Figma', description: 'Best & fastest' },
                      { value: 'screenshots', title: 'Screenshots', description: 'OK, needs review' },
                      { value: 'none', title: 'Not yet', description: 'I can guide you' },
                    ]}
                  />
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <FieldLabel label="How many sections/pages?" hint="For a landing page, think hero+sections. For a dashboard, think views." />
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={state.pagesOrSections}
                      onChange={(e) =>
                        setState((p) => ({ ...p, pagesOrSections: Number(e.target.value) }))
                      }
                      className="w-full"
                    />
                    <div className="w-14 text-center rounded-md border border-white/10 bg-white/5 py-2 text-sm font-semibold">
                      {state.pagesOrSections}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FieldLabel label="Animations" />
                      <OptionRow<Animations>
                        value={state.animations}
                        onChange={(v) => setState((p) => ({ ...p, animations: v }))}
                        options={[
                          { value: 'none', label: 'None' },
                          { value: 'basic', label: 'Basic' },
                          { value: 'premium', label: 'Premium' },
                        ]}
                      />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel label="Forms" />
                      <OptionRow<Forms>
                        value={state.forms}
                        onChange={(v) => setState((p) => ({ ...p, forms: v }))}
                        options={[
                          { value: 'none', label: 'None' },
                          { value: 'simple', label: 'Simple' },
                          { value: 'advanced', label: 'Advanced' },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold">Deployment</div>
                      <div className="text-xs text-muted-foreground">Netlify/Vercel deploy included</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setState((p) => ({ ...p, deployment: !p.deployment }))}
                      className={cn(
                        "h-9 w-16 rounded-full border transition-colors relative",
                        state.deployment ? "bg-primary/30 border-primary/40" : "bg-white/5 border-white/15"
                      )}
                      aria-pressed={state.deployment}
                    >
                      <span
                        className={cn(
                          "absolute top-1 h-7 w-7 rounded-full bg-white transition-transform",
                          state.deployment ? "translate-x-8" : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <FieldLabel label="Deadline" />
                  <OptionGrid<Deadline>
                    value={state.deadline}
                    onChange={(v) => setState((p) => ({ ...p, deadline: v }))}
                    options={[
                      { value: 'normal', title: 'Normal', description: 'Best value + flexible revisions' },
                      { value: 'rush', title: 'Rush', description: 'Faster delivery (limited revisions)' },
                    ]}
                  />

                  <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-primary">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Recommended package</div>
                        <div className="text-sm text-muted-foreground">
                          <span className="text-foreground font-semibold">{summary.recommendedPackage}</span> • {summary.timelineText} • {summary.priceText}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          This is a preview estimate. Final scope is confirmed before work begins.
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </motion.div>
          </div>
        </Card>

        {/* Output */}
        <Card hover={false} className="border-white/10 bg-secondary/20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div className="text-sm font-semibold">Generated scope</div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2" onClick={copyScope}>
                <Clipboard className="h-4 w-4" />
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <Button size="sm" variant="outline" className="gap-2" onClick={downloadScope}>
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-background/40 p-4 space-y-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Estimate
              </div>
              <div className="text-lg font-bold">{summary.priceText}</div>
              <div className="text-sm text-muted-foreground">{summary.timelineText}</div>
              <div className="text-sm text-muted-foreground">
                Package: <span className="text-foreground font-semibold">{summary.recommendedPackage}</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-background/40 p-4 space-y-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Risk flags
              </div>
              {summary.risks.length === 0 ? (
                <div className="text-sm text-muted-foreground">No flags. Looks straightforward.</div>
              ) : (
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {summary.risks.slice(0, 3).map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-background/40 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Scope summary (copy/paste)
              </div>
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Looks like a real product
              </span>
            </div>
            <pre className="mt-3 text-xs leading-relaxed overflow-auto max-h-[260px] rounded-lg bg-black/30 border border-white/10 p-3">
              <code className="text-muted-foreground whitespace-pre-wrap">{scopeText}</code>
            </pre>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a href={profile.socials.fiverr} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full gap-2">
                Continue on Fiverr <Gavel className="h-4 w-4" />
              </Button>
            </a>
            <a href="#services" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                Compare packages <FileText className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </Card>
      </div>

      <div className="text-xs text-muted-foreground">
        Note: this is a demo. Real project scopes are confirmed in writing before coding begins.
      </div>
    </div>
  );
};

function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-semibold">{label}</div>
      {hint ? <div className="text-xs text-muted-foreground">{hint}</div> : null}
    </div>
  );
}

type OptionGridItem<T extends string> = {
  value: T;
  title: string;
  description: string;
};

function OptionGrid<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: OptionGridItem<T>[];
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {options.map((o) => {
        const isActive = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "text-left rounded-xl border p-4 transition-colors",
              isActive
                ? "border-primary/40 bg-primary/10"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            )}
            aria-pressed={isActive}
          >
            <div className="text-sm font-semibold">{o.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{o.description}</div>
          </button>
        );
      })}
    </div>
  );
}

type OptionRowItem<T extends string> = { value: T; label: string };

function OptionRow<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: OptionRowItem<T>[];
}) {
  return (
    <div className="inline-flex flex-wrap gap-2">
      {options.map((o) => {
        const isActive = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "px-3 py-2 rounded-md border text-sm transition-colors",
              isActive
                ? "bg-primary/20 border-primary/30 text-foreground"
                : "bg-white/5 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10"
            )}
            aria-pressed={isActive}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}





