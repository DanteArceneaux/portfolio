export type WhyHireMeItem = {
  title: string;
  description: string;
};

export type Service = {
  title: string;
  price: string;
  description: string;
  deliverables: string[];
  turnaround: string;
  requirements: string;
  /**
   * Optional deep-link to the matching Fiverr gig for this package.
   * If omitted, the site will fall back to the general Fiverr profile link.
   */
  fiverrGigUrl?: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  meta: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type ProjectDemoId = 'dashboard' | 'landing' | 'scope';

export type Project = {
  title: string;
  tech: string[];
  description: string;
  challenge: string;
  solution: string;
  demoId: ProjectDemoId;
  thumbnail: string;
  highlights: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  type: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  year: string;
};

export type CertificationItem = {
  name: string;
  issuer: string;
  year: string;
};

export type SocialLinks = {
  fiverr: string;
  /**
   * Optional deep-link to your primary Fiverr gig (recommended target for primary CTAs).
   * If omitted, CTAs should fall back to the general Fiverr profile link.
   */
  fiverrGig?: string;
  github: string;
  linkedin: string;
  /**
   * Optional direct email contact. Leave empty string if you want Fiverr-only.
   * Example: \"mailto:you@domain.com\"
   */
  email: string;
};

export type Profile = {
  name: string;
  handle: string;
  title: string;
  location: string;
  languages: string[];
  headline: string;
  bio: string[];
  whyHireMe: WhyHireMeItem[];
  skills: string[];
  services: Service[];
  processSteps: ProcessStep[];
  faq: FaqItem[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  socials: SocialLinks;
};


