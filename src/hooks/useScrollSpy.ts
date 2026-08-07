import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSectionRegistry } from '@/context/SectionRegistry'
import type { SectionId } from '@/data/types'
import { pathForSection, resolveRoute, SECTION_ORDER } from '@/lib/routes'
import { navFlags } from '@/lib/navFlags'

/**
 * Scroll position -> URL, and the active-nav-link highlight.
 *
 * Writes with `replace`, never `push`. Pushing would stuff one history entry
 * per section scrolled past, which makes the Back button useless — press it and
 * you crawl back up the page one section at a time instead of leaving.
 */
export function useScrollSpy(): SectionId {
  const registry = useSectionRegistry()
  const navigate = useNavigate()
  const location = useLocation()
  const [active, setActive] = useState<SectionId>(() => resolveRoute(location.pathname).sectionId)
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const entries = registry.entries()
    if (entries.length === 0) return

    // -45%/-45% leaves a thin band across the middle of the viewport, so
    // exactly one section is ever "active" and the value never flickers.
    const observer = new IntersectionObserver(
      (records) => {
        if (navFlags.suspendSpy || navFlags.doorActive) return

        const visible = records
          .filter((r) => r.isIntersecting)
          .map((r) => r.target.id as SectionId)
          .filter((id) => SECTION_ORDER.includes(id))

        if (visible.length === 0) return

        const next = visible.sort(
          (a, b) => SECTION_ORDER.indexOf(a) - SECTION_ORDER.indexOf(b),
        )[0]

        if (next === activeRef.current) return
        setActive(next)
        navigate(pathForSection(next), { replace: true, state: { source: 'scrollspy' } })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    for (const [, node] of entries) observer.observe(node)
    return () => observer.disconnect()
  }, [registry, navigate])

  // Keep the highlight honest when the URL changes from a door or a nav click.
  useEffect(() => {
    const { sectionId } = resolveRoute(location.pathname)
    setActive(sectionId)
  }, [location.pathname])

  return active
}
