export type ProjectType = 'uiConversion' | 'landingPage' | 'dashboard' | 'bugfix';
export type DesignSource = 'figma' | 'screenshots' | 'none';
export type Animations = 'none' | 'basic' | 'premium';
export type Forms = 'none' | 'simple' | 'advanced';
export type Deadline = 'normal' | 'rush';

export type ScopeState = {
  projectType: ProjectType;
  designSource: DesignSource;
  pagesOrSections: number;
  animations: Animations;
  forms: Forms;
  deployment: boolean;
  deadline: Deadline;
};

export type ScopeSummary = ScopeState & {
  recommendedPackage: string;
  priceText: string;
  timelineText: string;
  deliverables: string[];
  risks: string[];
  projectTypeLabel: string;
  designSourceLabel: string;
  animationsLabel: string;
  formsLabel: string;
};

export const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  uiConversion: 'UI Conversion (Figma → React/Tailwind)',
  landingPage: 'Landing Page',
  dashboard: 'Dashboard',
  bugfix: 'Bug Fix / Refactor',
};

export const DESIGN_SOURCE_LABEL: Record<DesignSource, string> = {
  figma: 'Figma file available',
  screenshots: 'Screenshots only',
  none: 'No design yet (needs guidance)',
};

export const ANIMATION_LABEL: Record<Animations, string> = {
  none: 'None',
  basic: 'Basic',
  premium: 'Premium',
};

export const FORMS_LABEL: Record<Forms, string> = {
  none: 'None',
  simple: 'Simple',
  advanced: 'Advanced',
};

export function clamp(n: number, min: number, max: number) {
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

export function buildScopeSummary(state: ScopeState): ScopeSummary {
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

export function buildScopeText(summary: ScopeSummary, opts?: { fiverrUrl?: string }) {
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
  if (opts?.fiverrUrl) {
    lines.push('');
    lines.push(`NEXT STEP`);
    lines.push(`----------------------------------------`);
    lines.push(`Send this scope to me on Fiverr: ${opts.fiverrUrl}`);
  }
  return lines.join('\n');
}

export function buildFiverrMessage(args: {
  summary: ScopeSummary;
  designLink?: string;
  notes?: string;
}) {
  const lines: string[] = [];
  lines.push(`Hi Dante — I’d like to hire you for ${args.summary.projectTypeLabel}.`);
  lines.push('');
  lines.push(`Design: ${args.designLink?.trim() ? args.designLink.trim() : '(will send)'}`);
  lines.push(`Sections/Pages: ${args.summary.pagesOrSections}`);
  lines.push(`Deadline: ${args.summary.deadline === 'rush' ? 'Rush' : 'Normal'}`);
  lines.push('');
  lines.push(`Estimate preview (ok if you adjust after review): ${args.summary.priceText}, ${args.summary.timelineText}`);
  lines.push(`Preferred package: ${args.summary.recommendedPackage}`);

  if (args.notes?.trim()) {
    lines.push('');
    lines.push(`Notes:`)
    lines.push(args.notes.trim());
  }

  lines.push('');
  lines.push(`Can you confirm price + timeline and what you need from me to start?`);
  return lines.join('\n');
}


