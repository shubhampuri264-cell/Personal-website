import { doors } from '@/data'
import type { SectionId } from '@/data/types'

/**
 * Routing model, stated once so it cannot drift:
 *
 *   Every path renders the SAME full document containing every section.
 *   The path does not select WHAT renders — it selects WHERE YOU ARE LOOKING.
 *
 * The moment a <Route> swaps in a different component per path, three
 * requirements break at once: content is no longer always in the DOM, the page
 * no longer scrolls past the doors, and Ctrl+F no longer finds everything.
 */

/**
 * The canonical list of real sections, and the source of truth for two other
 * files. `vercel.json` names these same eight in its SPA rewrite so that an
 * unknown path falls through to a real HTTP 404 instead of quietly serving the
 * homepage with a 200. Adding a section here without adding it there gives you
 * a URL that works in dev and 404s in production, so `scripts/check-routes.mjs`
 * compares the two and fails the build when they drift.
 */
export const SECTION_ORDER: SectionId[] = [
  'home',
  'experience',
  'projects',
  'skills',
  'education',
  'hackathons',
  'hardware',
  'hobbies',
  'contact',
]

const SECTION_SET = new Set<string>(SECTION_ORDER)

export interface ResolvedRoute {
  sectionId: SectionId
  /** Present for `/projects/:slug` — the item to focus inside the grid. */
  detailSlug: string | null
  /** False when the first segment names no section — a genuine 404. */
  known: boolean
}

export function resolveRoute(pathname: string): ResolvedRoute {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)

  if (parts.length === 0) return { sectionId: 'home', detailSlug: null, known: true }

  const [first, second] = parts
  const known = SECTION_SET.has(first!)

  return {
    sectionId: known ? (first as SectionId) : 'home',
    detailSlug: second ?? null,
    known,
  }
}

export function pathForSection(sectionId: SectionId): string {
  return sectionId === 'home' ? '/' : `/${sectionId}`
}

export function pathForItem(sectionId: SectionId, slug: string): string {
  return `/${sectionId}/${slug}`
}

/** Old GitHub Pages links looked like `/#projects`. Map them once on mount. */
export function legacyHashToPath(hash: string): string | null {
  const raw = hash.replace(/^#/, '').toLowerCase()
  if (!raw) return null
  if (SECTION_SET.has(raw)) return pathForSection(raw as SectionId)
  // The old markup used capitalised ids for two sections.
  if (raw === 'download-cv') return '/'
  return doors.find((d) => d.id === raw)?.path ?? null
}
