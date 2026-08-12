/**
 * Content model.
 *
 * Everything on this site renders from typed data. No component contains a
 * person's name, a date, or a URL — so updating the resume means editing this
 * folder and nothing else.
 */

/**
 * A course completion or workshop. Deliberately not a `Skill` — completing a
 * course is not the same claim as having shipped with something, and mixing the
 * two is exactly the overclaim the skills list was cleaned up to avoid.
 */
export interface Certification {
  slug: string
  name: string
  issuer: string
  /** Rendered verbatim, e.g. `Jul 2026`. */
  date: string
  /** Path under `public/certificates/`. Every entry here has a real PDF. */
  href: string
}

export type SectionId =
  | 'home'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'hackathons'
  | 'hardware'
  | 'hobbies'
  | 'contact'

export interface DateRange {
  /** `YYYY-MM`, used for sorting only. */
  start: string
  /** `null` means Present. */
  end: string | null
  /** What actually gets rendered, e.g. `Feb 2026 – Apr 2026`. */
  display: string
}

export type LinkKind =
  | 'github'
  | 'live'
  | 'demo'
  | 'linkedin'
  | 'email'
  | 'phone'
  | 'resume'
  | 'cert'

export interface Link {
  kind: LinkKind
  label: string
  href: string
  external?: boolean
  /**
   * `demo` links only. Set when the recording is vertical (a YouTube Short, a
   * phone screen capture) so the modal opens 9:16 instead of pillarboxing a
   * portrait video inside a 16:9 frame.
   */
  portrait?: boolean
}

/** The headline number on a poster. Always present — every item earns one. */
export interface Bounty {
  /** `100+`, `12+`, `TOP 4` */
  value: string
  /** `ACTIVE LEARNERS`, `BETA TESTERS`, `OF 83 TEAMS` */
  unit: string
  caption?: string
}

/**
 * The long version of one item, for the project worth reading about.
 *
 * Fixed keys rather than a free list of sections, on purpose: the value of a
 * case study is the narrative shape — a constraint that forced a decision, and
 * a decision that was wrong before it was right. Free-form headings drift back
 * into a second pile of bullets.
 *
 * Carried by every featured project and nothing else. It stays collapsed, so a
 * reader who does not want it pays one line, while a reader who liked the card
 * above it has somewhere to go. Adding one to a compact-list project would be
 * the mistake: those are there to show range, not to be read.
 */
export interface CaseStudy {
  /** Why this exists at all — the user-facing failure, not the tech. */
  problem: string
  /** The hard limit that ruled out the obvious solution. */
  constraint: string
  /** In order. The dead ends are the point; a straight line reads as fiction. */
  attempts: string[]
  /** What actually went out. */
  shipped: string
  /** The known weakness. Naming it is worth more than hiding it. */
  next: string
}

export type BountyKind = 'experience' | 'project' | 'hackathon'

/**
 * One poster. A job, a project and a hackathon all render through this shape,
 * which is what lets `BountyCard` contain zero per-kind layout branching.
 */
export interface BountyItem {
  slug: string
  kind: BountyKind
  /** The big name line. */
  title: string
  /** Org, or a one-line tagline. */
  subtitle: string
  location?: string
  dates: DateRange
  bounty: Bounty
  summary: string
  bullets: string[]
  tech: string[]
  links: Link[]
  /** Eligible for the featured arrow-rail above the grid. */
  featured: boolean
  /** Rail ordering; lower comes first. */
  rank?: number
  status?: 'shipped' | 'in-progress' | 'archived'
  /** Renders as a collapsed section on the card. Rare by design — see `CaseStudy`. */
  caseStudy?: CaseStudy
  media?: { image?: string; youtubeId?: string }
}

export interface Experience extends BountyItem {
  kind: 'experience'
  role: string
  company: string
  employmentType?: 'Internship' | 'Part-time' | 'Contract' | 'Full-time'
  workMode?: 'On-site' | 'Hybrid' | 'Remote'
}

export interface Project extends BountyItem {
  kind: 'project'
  /** `featured` gets a full poster; `more` goes in the compact list. */
  tier: 'featured' | 'more'
}

export interface Hackathon extends BountyItem {
  kind: 'hackathon'
  event: string
  placement?: string
  mode: 'solo' | 'team'
}

export interface Education {
  slug: string
  school: string
  degree: string
  location: string
  status: 'graduated' | 'in-progress'
  /** Rendered verbatim, carrying the `Graduated` qualifier. */
  displayDate: string
  coursework: string[]
  /**
   * Latin honors only. These qualify the degree itself, are printed on the
   * diploma, and render inline with it.
   */
  honors?: string[]
  /**
   * Recurring semester recognition, which is a different kind of claim from a
   * degree qualifier and so gets its own block rather than sitting in `honors`.
   */
  awards?: string[]
  /**
   * The diploma itself, under `public/`. Deliberately separate from
   * `Certification`: a degree is not a course completion, and burying it in a
   * list next to a workshop certificate reads as though they weigh the same.
   */
  diplomaUrl?: string
}

/**
 * No proficiency tier. A "Working" or "Familiar" badge next to a skill reads as
 * a hedge — it invites the reader to discount the whole list. Appearing here is
 * the claim: this is something worth being asked about in an interview.
 * Anything that could not clear that bar was deleted rather than downgraded.
 */
export interface Skill {
  name: string
  /** Slug into `lib/icons.tsx`; falls back to initials when absent. */
  icon?: string
  /** Where this was actually used — turns a badge into evidence. */
  usedIn?: string[]
}

export interface SkillGroup {
  id: string
  label: string
  blurb: string
  accent: 'cyan' | 'fuchsia' | 'green'
  skills: Skill[]
}

/**
 * A photo of something physical. Two sizes, because a 700px tile has no business
 * downloading the 1400px file the lightbox needs.
 *
 * `alt` is never a copy of `caption` — the caption says what the thing is, the
 * alt describes what you would see, and a screen reader gets both.
 */
export interface GalleryImage {
  id: string
  /** Grid tile source, 700x525. */
  thumb: string
  /** Lightbox source, 1400x1050. */
  full: string
  caption: string
  alt: string
}

export interface GalleryGroup {
  id: string
  label: string
  blurb: string
  accent: 'cyan' | 'fuchsia' | 'green'
  items: GalleryImage[]
}

export interface Door {
  id: Exclude<SectionId, 'home'>
  label: string
  path: string
  /** Small line under the label on the door face. */
  blurb: string
  /** Number shown on the door plate, e.g. `04` items behind it. */
  count?: string
  accent: 'cyan' | 'fuchsia' | 'green'
  order: number
}

export interface Profile {
  name: string
  role: string
  tagline: string
  /**
   * The one thing a recruiter is actually scanning for. Data, not markup — it
   * appears in the hero eyebrow and again in the contact intro, and those two
   * must never drift apart.
   */
  availability: string
  /** Where the work can happen. Separate from `location`, which is where I live. */
  workLocation: string
  blurb: string
  photo: string
  location: string
  email: string
  phone: string
  resumeUrl: string
  links: Link[]
}
