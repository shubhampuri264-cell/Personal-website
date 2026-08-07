import type { Profile } from './types'

export const profile: Profile = {
  name: 'Shubham Puri',
  role: 'Software Engineer',
  tagline: 'Full-stack engineer building AI-powered products end to end.',
  // "Entry-level", not "full-time": full-time states a schedule, entry-level
  // states seniority — and it is the phrase recruiters actually filter on.
  availability: 'Open to entry-level software engineering roles',
  workLocation: 'New York or remote',
  // Kept to two sentences on purpose: this sits above the fold at every
  // viewport, and the evidence for every claim is in the cards below it.
  blurb:
    'Computer Science graduate (NYIT, May 2026) who owns features end to end: requirements, schema, deploy. Four products shipped to real users, most recently REST APIs and React serving 100+ learners at Dreamerix.',
  photo: '/images/profile.jpg',
  location: 'New York, NY',
  email: 'spur245@gmail.com',
  phone: '347-280-4249',
  resumeUrl: '/Shubham_P_CS_Resume.pdf',
  links: [
    {
      kind: 'github',
      label: 'GitHub',
      href: 'https://github.com/shubhampuri264-cell',
      external: true,
    },
    {
      kind: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/spuri-cs',
      external: true,
    },
    { kind: 'email', label: 'spur245@gmail.com', href: 'mailto:spur245@gmail.com' },
    { kind: 'phone', label: '347-280-4249', href: 'tel:+13472804249' },
  ],
}
