import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { useSectionRegistry } from '@/context/SectionRegistry'
import { useMode } from '@/context/ModeContext'
import { resolveRoute } from '@/lib/routes'
import { navFlags, releaseSpyAfterScroll } from '@/lib/navFlags'
import { scrollToElement, scrollToTop } from '@/lib/scroll'

/** URL -> scroll position. The counterpart to useScrollSpy. */
export function useRouteScroll(): void {
  const location = useLocation()
  const navType = useNavigationType()
  const registry = useSectionRegistry()
  const { motionOff } = useMode()

  useEffect(() => {
    // The spy just wrote this URL. Scrolling again would close the loop.
    const source = (location.state as { source?: string } | null)?.source
    if (source === 'scrollspy') return

    // A door transition is running; it owns the scroll and does it while the
    // viewport is covered, so nothing here should compete.
    if (navFlags.doorActive) return

    const { sectionId, detailSlug } = resolveRoute(location.pathname)

    // Back/Forward gets an instant jump. Animating a POP feels broken.
    const smooth = !motionOff && navType !== 'POP'

    const target = detailSlug
      ? document.getElementById(`item-${detailSlug}`) ?? registry.get(sectionId)
      : registry.get(sectionId)

    navFlags.suspendSpy = true

    if (sectionId === 'home' && !detailSlug) scrollToTop(smooth)
    else if (target) scrollToElement(target, smooth)

    const release = releaseSpyAfterScroll(smooth ? 1200 : 400)
    return release
    // location.key changes on every navigation, including replace.
  }, [location.key, location.pathname, location.state, navType, registry, motionOff])
}
