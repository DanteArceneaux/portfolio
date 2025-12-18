import type { Profile } from './profile.types';

export const profile: Profile = {
  name: "Dante",
  handle: "@dominerex",
  title: "Front End Dev",
  location: "Federal Way, WA • Remote",
  languages: ["English"],
  headline: "The \"J.D.\" Developer | Precision & Speed",
  bio: [
    "I am a US-based developer (Washington State) with a Law background (J.D., Univ. of Michigan). I bring strict legal precision to your code.",
    "I specialize in Rapid UI Conversions. I turn designs, screenshots, or ideas into production-ready React & Tailwind apps in record time."
  ],
  whyHireMe: [
    {
      title: "Reliability",
      description: "I communicate clearly & hit deadlines."
    },
    {
      title: "Speed",
      description: "My AI-augmented workflow is 3x faster than standard agencies."
    },
    {
      title: "Quality",
      description: "Clean, semantic, mobile-responsive code."
    }
  ],
  skills: [
    "Figma designer",
    "Tailwind CSS expert",
    "React expert",
    "JavaScript developer",
    "Html expert",
    "CSS expert",
    "TypeScript",
    "Framer Motion",
    "Spring Boot",
    "Angular"
  ],
  services: [
    {
      title: "Rapid UI Conversion",
      price: "From $99",
      description: "I convert your Figma designs, screenshots, or sketches into pixel-perfect, responsive React & Tailwind code.",
      deliverables: [
        "Component-based Architecture",
        "Mobile Responsive Layout",
        "Clean, Semantic HTML/CSS",
        "Basic Interactivity"
      ],
      turnaround: "2-3 Days",
      requirements: "Design file (Figma/Sketch) or clear screenshots."
    },
    {
      title: "Landing Page Build",
      price: "From $249",
      description: "A complete, high-converting landing page built for speed and SEO.",
      deliverables: [
        "All 'Rapid UI' features",
        "Smooth Animations (Framer Motion)",
        "SEO Best Practices",
        "Deployment Setup (Netlify/Vercel)"
      ],
      turnaround: "3-5 Days",
      requirements: "Content (Copy/Images) and Branding guidelines."
    },
    {
      title: "Bug Fix & Refactor",
      price: "From $79",
      description: "I will audit your code, fix specific bugs, or refactor for better performance and maintainability.",
      deliverables: [
        "Code Audit & Report",
        "Bug Fixes",
        "TypeScript Conversion (Optional)",
        "Performance Optimization"
      ],
      turnaround: "1-3 Days",
      requirements: "Access to codebase (GitHub) and list of issues."
    }
  ],
  processSteps: [
    {
      title: "Send design & scope",
      description: "Share a Figma link (preferred) or clear screenshots + tell me what pages/sections you need.",
      meta: "Same day"
    },
    {
      title: "First draft in 24–48h",
      description: "You get a responsive, working build early so we can iterate fast and avoid surprises.",
      meta: "1–2 days"
    },
    {
      title: "Revisions & final delivery",
      description: "I apply revisions, polish interactions, and deliver clean code with a professional handoff.",
      meta: "Final"
    }
  ],
  faq: [
    {
      q: "What do you need from me to start?",
      a: "A Figma link (preferred) or clear screenshots, the pages/sections you want, and any brand colors/fonts. If you have existing components or a design system, share that too."
    },
    {
      q: "How many revisions are included?",
      a: "Two revision rounds are included for most packages. If scope changes significantly, I’ll confirm before proceeding."
    },
    {
      q: "What counts as “one page”?",
      a: "One route/view (e.g., a landing page). Typical states (hover, empty, loading) are included. Multi-step flows, auth, or complex dashboards are quoted separately."
    },
    {
      q: "What do I receive at delivery?",
      a: "A clean React + Tailwind codebase (GitHub repo or ZIP), responsive layout, and clear instructions to run/build. I can also deploy to Netlify/Vercel if requested."
    },
    {
      q: "Can you match my existing design system/components?",
      a: "Yes. If you have tokens/components, I’ll follow them. If not, I’ll build a consistent component style that matches your brand."
    }
  ],
  projects: [
    {
      title: "SaaS Analytics Dashboard",
      // Note: chart is rendered with SVG (intentionally no chart library for this lightweight demo)
      tech: ["React", "TypeScript", "Tailwind", "SVG"],
      description: "A high-performance dashboard for visualizing complex datasets.",
      challenge: "Rendering large datasets without UI lag while maintaining mobile responsiveness.",
      solution: "Built a lightweight, interactive dashboard with SVG charting and a sortable table to demonstrate state + UI performance patterns.",
      demoId: "dashboard",
      thumbnail: "/projects/dashboard.png",
      highlights: [
        "Timeframe toggle (7/30/90 days)",
        "SVG chart rendering (no chart library)",
        "Sortable 'Top Pages' table"
      ]
    },
    {
      title: "Marketing Landing Page",
      tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      description: "A high-conversion landing page with scroll-triggered animations.",
      challenge: "Creating engaging animations that don't compromise load speed.",
      solution: "Added polished micro-animations and an accessible lead form with validation, loading, and a clean success state.",
      demoId: "landing",
      thumbnail: "/projects/landing.png",
      highlights: [
        "Accessible lead form with validation",
        "Async submit + success state",
        "Mobile-first layout"
      ]
    }
  ],
  experience: [
    {
      role: "Full-stack Developer",
      company: "Cognizant",
      type: "Full-time",
      duration: "Apr 2023 - Feb 2024 • 11 mos",
      location: "Seattle, Washington, United States • Remote",
      description: "Worked within a global Fortune 500 technology consultancy, delivering high-quality solutions for enterprise clients.",
      achievements: [
        "Operated in a high-compliance, fast-paced environment requiring strict attention to detail.",
        "Collaborated with cross-functional teams to meet rigorous project deadlines.",
        "Maintained professional standards for documentation and deliverables.",
        "This experience taught me the \"Enterprise Standard\" of reliability and communication, which I now bring to every freelance project."
      ]
    },
    {
      role: "Software Developer",
      company: "Revature",
      type: "Full-time",
      duration: "Mar 2022 - Mar 2023 • 1 yr 1 mo",
      location: "Reston, Virginia, United States • Remote",
      description: "Full-stack Java/React developer also completed project using Angular.",
      achievements: [
        "Developed scalable web applications using React and Angular frameworks.",
        "Implemented backend services with Java Spring Boot.",
        "Utilized Jenkins for CI/CD pipelines to streamline deployment.",
        "Applied Object-Oriented Programming (OOP) principles for maintainable code architecture."
      ]
    }
  ],
  education: [
    {
      school: "University of Michigan",
      degree: "J.D. Degree, Law",
      year: "Graduated 2007"
    },
    {
      school: "Western Michigan University",
      degree: "B.A. Degree, English",
      year: "Graduated 2004"
    }
  ],
  certifications: [
    {
      name: "Meta Frontend Developer Professional Certificate",
      issuer: "Coursera/Meta",
      year: "2024"
    }
  ],
  socials: {
    fiverr: "https://www.fiverr.com/dominerex",
    github: "https://github.com/DanteArceneaux", // Updated based on repo URL
    linkedin: "https://www.linkedin.com/in/dante-arceneaux-90269247/",
    email: "" // Optional; add a mailto: link if you want direct contact outside Fiverr.
  }
};
