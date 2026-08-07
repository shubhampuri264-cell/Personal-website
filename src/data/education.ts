import type { Certification, Education } from './types'

export const education: Education[] = [
  {
    slug: 'nyit-bs-cs',
    school: 'New York Institute of Technology',
    degree: 'B.S. in Computer Science',
    location: 'Manhattan, NY',
    status: 'graduated',
    // Reads as completed, not as an expected date.
    displayDate: 'Graduated May 2026',
    coursework: [
      'Data Structures',
      'Design & Algorithms',
      'Software Engineering',
      'Artificial Intelligence',
      'Computer Networks',
      'System Design',
      'Database',
    ],
    // Straight off the diploma. It was missing from the site entirely, and it is
    // one of the few claims here a recruiter can verify in a single click.
    honors: ['Cum Laude'],
    /*
     * Presidential Honor List first: it is the higher of the two awards and
     * carries the stricter GPA cut.
     *
     * Wording matches the resume PDF exactly. A recruiter who opens both should
     * not see the same award under two different names.
     *
     * Deliberately no semester counts. "a few times" is what is actually known,
     * and an invented number is the one kind of detail a reader can catch out.
     * Add the counts here once the transcript confirms them, because "Dean's
     * List, 4 semesters" reads as a pattern where the bare name reads as filler.
     */
    awards: ['Presidential Honor List', "Dean's List"],
    diplomaUrl: '/nyit-diploma.pdf',
  },
]

/**
 * Newest first. Every entry links to the actual PDF in `public/certificates/` —
 * an unverifiable certification line is worth less than no line at all.
 */
export const certifications: Certification[] = [
  {
    slug: 'ai-fluency',
    name: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic',
    date: 'Jul 2026',
    href: '/certificates/ai-fluency.pdf',
  },
  {
    slug: 'claude-101',
    name: 'Claude 101',
    issuer: 'Anthropic',
    date: 'Jul 2026',
    href: '/certificates/claude-101.pdf',
  },
  {
    slug: 'databricks-lakehouse',
    name: 'Databricks Lakehouse Hands-On Workshop',
    issuer: 'NYIT',
    date: 'Apr 2026',
    href: '/certificates/databricks-workshop.pdf',
  },
]
