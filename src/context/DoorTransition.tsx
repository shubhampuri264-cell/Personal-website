import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useMode } from './ModeContext'
import { useSectionRegistry } from './SectionRegistry'
import type { SectionId } from '@/data/types'
import { navFlags, releaseSpyAfterScroll } from '@/lib/navFlags'
import { scrollToElement, scrollToTop } from '@/lib/scroll'

/**
 * The door transition.
 *
 * The naive version — smooth-scroll five thousand pixels while two panels swing
 * open — looks bad and races the scroll spy the whole way down. So instead the
 * viewport is covered FIRST, the scroll happens instantly behind the cover, and
 * the doors then open onto an already-correct position:
 *
 *   1. cover   (~140ms)  panels close over the viewport
 *   2. jump    (0ms)     instant scrollIntoView while nothing is visible
 *   3. open    (~520ms)  panels swing apart revealing the destination
 *   4. settle            focus the section heading, release the spy
 *
 * Load-bearing property: this is decoration layered on top of navigation that
 * already works. The door is a real <Link> and it is never preventDefault'd.
 * Kill JavaScript, force reduced motion, or throw inside the animation and the
 * link still navigates and useRouteScroll still lands you in the right place.
 */

export type DoorAccent = 'cyan' | 'fuchsia' | 'green'

const COVER_MS = 140
const OPEN_MS = 520

interface DoorState {
  sectionId: SectionId
  accent: DoorAccent
  label: string
  phase: 'cover' | 'open'
}

interface DoorTransitionValue {
  state: DoorState | null
  openDoor: (sectionId: SectionId, accent: DoorAccent, label: string) => void
}

const DoorTransitionContext = createContext<DoorTransitionValue | null>(null)

export function DoorTransitionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DoorState | null>(null)
  const { motionOff } = useMode()
  const registry = useSectionRegistry()
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  const openDoor = useCallback(
    (sectionId: SectionId, accent: DoorAccent, label: string) => {
      // With motion off there is no overlay at all — the <Link> navigates and
      // useRouteScroll does an instant jump. Nothing to coordinate.
      if (motionOff) return

      clearTimers()
      navFlags.doorActive = true
      navFlags.suspendSpy = true
      setState({ sectionId, accent, label, phase: 'cover' })
    },
    [motionOff, clearTimers],
  )

  useEffect(() => {
    if (!state || state.phase !== 'cover') return

    const jump = window.setTimeout(() => {
      // Step 2: instant scroll while the viewport is covered.
      const node = registry.get(state.sectionId)
      if (state.sectionId === 'home' || !node) scrollToTop(false)
      else scrollToElement(node, false)

      setState((s) => (s ? { ...s, phase: 'open' } : s))
    }, COVER_MS)

    timers.current.push(jump)
    return () => window.clearTimeout(jump)
  }, [state, registry])

  useEffect(() => {
    if (!state || state.phase !== 'open') return

    const settle = window.setTimeout(() => {
      setState(null)
      navFlags.doorActive = false

      // Focus the destination heading. `preventScroll` is essential — without
      // it the browser scrolls the element into view its own way and undoes
      // the positioning we just did.
      const heading = document.getElementById(`heading-${state.sectionId}`)
      heading?.focus({ preventScroll: true })

      releaseSpyAfterScroll(300)
    }, OPEN_MS)

    timers.current.push(settle)
    return () => window.clearTimeout(settle)
  }, [state])

  // Never leave the flags stuck if this unmounts mid-transition.
  useEffect(
    () => () => {
      clearTimers()
      navFlags.doorActive = false
      navFlags.suspendSpy = false
    },
    [clearTimers],
  )

  const value = useMemo<DoorTransitionValue>(() => ({ state, openDoor }), [state, openDoor])

  return (
    <DoorTransitionContext.Provider value={value}>{children}</DoorTransitionContext.Provider>
  )
}

export function useDoorTransition(): DoorTransitionValue {
  const ctx = useContext(DoorTransitionContext)
  if (!ctx) throw new Error('useDoorTransition must be used inside <DoorTransitionProvider>')
  return ctx
}

export const DOOR_TIMING = { COVER_MS, OPEN_MS }
