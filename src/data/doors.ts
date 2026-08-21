import type { Door } from './types'

/**
 * The doors are decorated navigation, not a gate. Every path below renders the
 * same full document — the door only decides where you land in it.
 */
export const doors: Door[] = [
  {
    id: 'experience',
    label: 'Experience',
    path: '/experience',
    blurb: 'Where I have shipped',
    count: '04',
    accent: 'cyan',
    order: 1,
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    blurb: 'What I have built',
    count: '09',
    accent: 'fuchsia',
    order: 2,
  },
  {
    id: 'skills',
    label: 'Skills',
    path: '/skills',
    blurb: 'What I work with',
    count: '06',
    accent: 'green',
    order: 3,
  },
  {
    id: 'education',
    label: 'Education',
    path: '/education',
    blurb: 'Where I studied',
    count: '01',
    accent: 'cyan',
    order: 4,
  },
  {
    id: 'hackathons',
    label: 'Hackathons',
    path: '/hackathons',
    blurb: 'Built under a clock',
    count: '02',
    accent: 'fuchsia',
    order: 5,
  },
  {
    id: 'hardware',
    label: 'Hardware',
    path: '/hardware',
    blurb: 'Printer, breadboard, robot kit',
    count: '11',
    accent: 'cyan',
    order: 6,
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    path: '/hobbies',
    blurb: 'Off the clock',
    // Image count, matching Hardware's. It read '01' from when the gallery was
    // a single placeholder and never moved when real photos landed.
    count: '02',
    accent: 'fuchsia',
    order: 7,
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    blurb: 'Get in touch',
    accent: 'green',
    order: 8,
  },
]
