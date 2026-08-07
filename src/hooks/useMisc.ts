import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { legacyHashToPath } from '@/lib/routes'

/** Old GitHub Pages links looked like `/#projects`. Translate them once. */
export function useLegacyHashRedirect(): void {
  const navigate = useNavigate()
  const location = useLocation()
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true
    const path = legacyHashToPath(location.hash)
    if (path) navigate(path, { replace: true })
  }, [location.hash, navigate])
}

/** Browser scroll restoration fights useRouteScroll on every Back press. */
export function useManualScrollRestoration(): void {
  useEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Locks body scroll while a modal or drawer is open. */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

/** Keeps Tab inside `ref` while `active`, and restores focus on close. */
export function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    if (!active || !ref.current) return
    const root = ref.current
    const previous = document.activeElement as HTMLElement | null

    const selector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
        (n) => n.offsetParent !== null,
      )
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    root.addEventListener('keydown', onKeyDown)
    return () => {
      root.removeEventListener('keydown', onKeyDown)
      previous?.focus?.()
    }
  }, [ref, active])
}
