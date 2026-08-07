import type { Hackathon } from './types'

export const hackathons: Hackathon[] = [
  {
    slug: 'nepali-hackathon-2026',
    kind: 'hackathon',
    event: 'Nepali Hackathon',
    mode: 'team',
    placement: 'Top 4 of 83 teams',
    title: 'Nepali Hackathon',
    subtitle: 'Mental health web app',
    dates: { start: '2026-03', end: '2026-03', display: 'March 2026' },
    bounty: { value: 'TOP 4', unit: 'of 83 teams' },
    summary:
      'Built a mental health web app for stigma-free early detection and peer support, placing top 4 out of 83 competing teams.',
    /* Bullets say what the summary and the headline number do not. "Placed top
       4 of 83" is already the number on the card; repeating it here costs a
       line and tells the reader nothing new. */
    bullets: [
      'Shipped it bilingual in English and Nepali, because an English-only mental health tool does not reach the people it was built for.',
      'Layered anonymous peer support on top of the assessment, so someone can ask for help without attaching their name to it.',
    ],
    tech: ['React', 'Supabase', 'Gemini API'],
    links: [{ kind: 'cert', label: 'Certificate', href: '/certificates/nepali-hackathon.pdf' }],
    featured: true,
    rank: 1,
    status: 'shipped',
  },
  {
    slug: 'nyit-hackathon-2024',
    kind: 'hackathon',
    event: 'NYIT Hackathon',
    mode: 'solo',
    title: 'NYIT Hackathon',
    subtitle: 'Facial recognition attendance system',
    location: 'Manhattan, NY',
    // A month, not a place. The card renders this next to a calendar icon and
    // renders `location` next to a pin icon, so "Manhattan 2024" printed the
    // city twice and put a place name in the date slot.
    dates: { start: '2024-11', end: '2024-11', display: 'November 2024' },
    bounty: { value: 'SOLO', unit: 'built start to finish' },
    summary:
      'Built a real-time facial recognition system in Python and OpenCV, then extended it into an automated attendance pipeline with identity verification.',
    bullets: [
      'Ran encoding and matching against a live camera feed rather than a prepared image set, so latency and lighting were real constraints.',
      'Extended matching into an attendance pipeline with identity verification, so a recognised face writes a record instead of printing a name.',
    ],
    tech: ['Python', 'OpenCV'],
    links: [],
    featured: true,
    rank: 2,
    status: 'shipped',
  },
]
