import { doors } from './doors'
import { certifications, education } from './education'
import { experience } from './experience'
import { hackathons } from './hackathons'
import { profile } from './profile'
import { projects } from './projects'
import { skillGroups } from './skills'
import type { BountyItem } from './types'

export * from './types'
export {
  certifications,
  doors,
  education,
  experience,
  hackathons,
  profile,
  projects,
  skillGroups,
}

/* ---- derived selectors ------------------------------------------------- */

export const featuredProjects = projects.filter((p) => p.tier === 'featured')
export const moreProjects = projects.filter((p) => p.tier === 'more')

const byRank = (a: BountyItem, b: BountyItem) => (a.rank ?? 99) - (b.rank ?? 99)

/** Top items for a section's arrow-rail. The rail is a shortcut, never the only path. */
export function railItems(items: BountyItem[], limit = 3): BountyItem[] {
  return items
    .filter((i) => i.featured)
    .sort(byRank)
    .slice(0, limit)
}

const allItems: BountyItem[] = [...experience, ...projects, ...hackathons]

export function itemBySlug(slug: string): BountyItem | undefined {
  return allItems.find((i) => i.slug === slug)
}

/* ---- dev-only invariants ------------------------------------------------ */

if (import.meta.env.DEV) {
  const seen = new Set<string>()
  for (const item of allItems) {
    if (seen.has(item.slug)) {
      console.error(`[data] duplicate slug "${item.slug}" — deep links will collide.`)
    }
    seen.add(item.slug)
  }

  const sectionIds = new Set(doors.map((d) => d.id))
  for (const door of doors) {
    if (door.path !== `/${door.id}`) {
      console.error(`[data] door "${door.id}" path "${door.path}" does not match its section id.`)
    }
  }
  if (sectionIds.size !== doors.length) {
    console.error('[data] duplicate door ids.')
  }
}
