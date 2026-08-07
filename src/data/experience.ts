import type { Experience } from './types'

/**
 * Reverse chronological. Reconciled against Shubham_P_CS_Resume.pdf (Jul 2026
 * revision). The resume compresses these bullets for one-page fit; the fuller
 * wording lives here because the site has room for it.
 *
 * Rule for bullets: each one must say something the summary and the headline
 * number do not already say. A bullet that restates "100+ active learners"
 * under a card that already prints "100+ ACTIVE LEARNERS" is a wasted line, and
 * three of them in a row train the reader to skip the list.
 */
export const experience: Experience[] = [
  {
    slug: 'dreamerix-swe-intern',
    kind: 'experience',
    role: 'Software Engineering Intern',
    company: 'Dreamerix',
    title: 'Software Engineering Intern',
    subtitle: 'Dreamerix',
    location: 'New York, NY',
    employmentType: 'Internship',
    workMode: 'Hybrid',
    dates: { start: '2026-02', end: '2026-04', display: 'Feb 2026 – Apr 2026' },
    bounty: { value: '100+', unit: 'active learners served' },
    summary:
      'Shipped backend and frontend on a live learning platform, pairing daily with a senior engineer across the whole stack.',
    bullets: [
      'Built and maintained RESTful endpoints in Node.js/Express and Python covering enrollment, authentication, course-progress tracking and certification workflows.',
      'Designed PostgreSQL schemas and optimized queries in a daily pair-programming loop with a senior engineer, shipping across bi-weekly Agile sprints.',
      'Wrote the React components that consume those endpoints, so one person owned each feature from schema through to what the learner sees.',
    ],
    /* Express is named in the bullet above because that is what the endpoints
       actually ran on, but it is deliberately not a tag here and not in the
       skills list — a tag is a claim to be interviewed on, a bullet is history. */
    tech: ['Node.js', 'Python', 'React', 'PostgreSQL', 'REST API', 'Agile'],
    links: [],
    featured: true,
    rank: 1,
    /* No status. "Shipped" is project vocabulary — on a job it says nothing the
       date range has not already said, and on an ongoing role it is wrong.
       Only a currently-held role carries a badge here. */
  },
  {
    slug: 'queens-library-tech-mentor',
    kind: 'experience',
    role: 'Tech Mentor',
    company: 'Queens Library',
    title: 'Tech Mentor',
    subtitle: 'Queens Library',
    location: 'Queens, NY',
    employmentType: 'Part-time',
    workMode: 'On-site',
    dates: { start: '2025-05', end: null, display: 'May 2025 – Present' },
    bounty: { value: '15+', unit: 'teens mentored' },
    summary:
      'Run the teen tech program: a new curriculum every month, taught one-on-one.',
    bullets: [
      'Design and lead new curriculum monthly across web development, Arduino, 3D printing, Lego robotics and AI tools.',
      'Take students from no coding background at all to shipping a project they chose themselves.',
      'Introduce AI tools to teens with no prior exposure, turning abstract ideas into something they can actually build in a session.',
    ],
    tech: ['Python', 'Web Development', 'Arduino', '3D Printing', 'AI Tools', 'Curriculum Design'],
    links: [],
    featured: true,
    rank: 2,
    // Currently held — the one case where a badge on a job card earns its space.
    status: 'in-progress',
  },
  {
    slug: 'outlier-ai-quality-analyst',
    kind: 'experience',
    role: 'AI Quality Analyst',
    company: 'Outlier',
    title: 'AI Quality Analyst',
    subtitle: 'Outlier',
    location: 'Remote',
    employmentType: 'Contract',
    workMode: 'Remote',
    dates: { start: '2024-10', end: '2025-02', display: 'Oct 2024 – Feb 2025' },
    bounty: { value: '20%', unit: 'model accuracy gain' },
    summary:
      'Built eval sets and stress-tested LLM behaviour inside a distributed evaluation team on tight sprint cycles.',
    bullets: [
      'Designed 25+ adversarial and edge-case prompts across code generation, reasoning and factual-accuracy tasks.',
      'Targeted the failure class that generic test sets miss: cases where a model is confidently wrong rather than obviously wrong.',
    ],
    tech: ['LLM Evaluation', 'Prompt Engineering', 'Adversarial Testing', 'Agile'],
    links: [],
    featured: true,
    rank: 3,
  },
  {
    slug: 'mouse-squad-tech-support',
    kind: 'experience',
    role: 'Tech Support',
    company: 'Mouse Squad',
    title: 'Tech Support',
    subtitle: 'Mouse Squad',
    location: 'Brooklyn, NY',
    employmentType: 'Part-time',
    workMode: 'On-site',
    dates: { start: '2023-09', end: '2024-04', display: 'Sep 2023 – Apr 2024' },
    bounty: { value: '30%', unit: 'downtime reduced' },
    summary:
      'Kept a multi-device environment running and inventoried, so staff never lost access.',
    bullets: [
      'Diagnosed hardware and software faults across a multi-device environment on a fixed same-day turnaround.',
      'Managed SQL-logged inventory for 50+ devices, so staff were never blocked waiting on an unaccounted machine.',
    ],
    tech: ['SQL', 'Hardware Diagnostics', 'IT Support'],
    links: [],
    featured: false,
  },
]
