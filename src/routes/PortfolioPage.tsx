import { useLocation } from 'react-router-dom'
import { NavBar } from '@/components/layout/NavBar'
import { Footer, RouteAnnouncer, SkipLink } from '@/components/layout/Chrome'
import { Hero } from '@/components/hero/Hero'
import { DoorTransitionOverlay } from '@/components/transitions/DoorTransitionOverlay'
import { ParticleField } from '@/components/background/ParticleField'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { HackathonsSection } from '@/components/sections/HackathonsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { useSectionRegistry } from '@/context/SectionRegistry'
import { useRouteScroll } from '@/hooks/useRouteScroll'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useLegacyHashRedirect, useManualScrollRestoration } from '@/hooks/useMisc'
import { resolveRoute } from '@/lib/routes'
import { NotFound } from './NotFound'
import { useEffect, useRef } from 'react'

/**
 * The canonical document.
 *
 * `/`, `/experience`, `/projects` and `/projects/agon` all render THIS, whole.
 * The path selects where you are looking, not what exists. Every section below
 * is mounted unconditionally, every time — that is the single structural
 * decision that keeps plain scrolling, Ctrl+F and deep links all working at
 * once, and it is the one thing not to "optimise" later.
 */
export function PortfolioPage() {
  const location = useLocation()
  const { sectionId, detailSlug, known } = resolveRoute(location.pathname)
  const registry = useSectionRegistry()
  const homeRef = useRef<HTMLDivElement>(null)

  // Registered BEFORE the routing hooks below, because effects run in
  // declaration order — the scroll spy sets up its observer in its own effect
  // and would otherwise miss `home` entirely.
  useEffect(() => {
    registry.register('home', homeRef.current)
    return () => registry.register('home', null)
  }, [registry])

  useManualScrollRestoration()
  useLegacyHashRedirect()
  useRouteScroll()
  const activeSection = useScrollSpy()

  // `/:sectionId` matches any single segment, so an unknown one lands here
  // rather than on the catch-all route. Show the real 404.
  if (!known) return <NotFound />

  return (
    <>
      <SkipLink />
      <ParticleField />
      <DoorTransitionOverlay />
      <RouteAnnouncer sectionId={activeSection} />

      <NavBar activeSection={activeSection} />

      <main id="main">
        <div id="home" ref={homeRef} className="sp-container">
          <Hero />
        </div>

        <ExperienceSection focusedSlug={sectionId === 'experience' ? detailSlug : null} />
        <ProjectsSection focusedSlug={sectionId === 'projects' ? detailSlug : null} />
        <SkillsSection />
        <EducationSection />
        <HackathonsSection focusedSlug={sectionId === 'hackathons' ? detailSlug : null} />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
