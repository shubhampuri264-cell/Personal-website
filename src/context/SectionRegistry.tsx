import { createContext, useCallback, useContext, useMemo, useRef } from 'react'
import type { SectionId } from '@/data/types'

/**
 * Sections register their DOM node here so the routing hooks can find them
 * without querySelector guesswork. The same node serves as both the scroll
 * target and the scroll-spy observation target.
 *
 * That only works because reveal animations are applied to a section's INNER
 * content wrapper, never to the <section> itself. If a section element were
 * parked at translateY(26px) awaiting its reveal, scrolling to it would compute
 * the wrong offset. Keep transforms off the registered node.
 */

interface RegistryValue {
  register: (id: SectionId, node: HTMLElement | null) => void
  get: (id: SectionId) => HTMLElement | null
  entries: () => Array<[SectionId, HTMLElement]>
}

const SectionRegistryContext = createContext<RegistryValue | null>(null)

export function SectionRegistryProvider({ children }: { children: React.ReactNode }) {
  const map = useRef(new Map<SectionId, HTMLElement>())

  const register = useCallback((id: SectionId, node: HTMLElement | null) => {
    if (node) map.current.set(id, node)
    else map.current.delete(id)
  }, [])

  const get = useCallback((id: SectionId) => map.current.get(id) ?? null, [])

  const entries = useCallback(() => Array.from(map.current.entries()), [])

  const value = useMemo<RegistryValue>(() => ({ register, get, entries }), [register, get, entries])

  return (
    <SectionRegistryContext.Provider value={value}>{children}</SectionRegistryContext.Provider>
  )
}

export function useSectionRegistry(): RegistryValue {
  const ctx = useContext(SectionRegistryContext)
  if (!ctx) throw new Error('useSectionRegistry must be used inside <SectionRegistryProvider>')
  return ctx
}
