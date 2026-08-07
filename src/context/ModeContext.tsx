import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, writeStorage } from '@/lib/storage'

export type Mode = 'bounty' | 'plain'

const STORAGE_KEY = 'sp:mode'

interface ModeValue {
  mode: Mode
  setMode: (mode: Mode) => void
  toggleMode: () => void
  /** True when the OS asks for reduced motion. */
  prefersReducedMotion: boolean
  /** The single flag every animation decision reads. */
  motionOff: boolean
}

const ModeContext = createContext<ModeValue | null>(null)

/** Read what the blocking script in index.html already decided — never re-derive. */
function initialMode(): Mode {
  if (typeof document === 'undefined') return 'bounty'
  return document.documentElement.dataset.mode === 'plain' ? 'plain' : 'bounty'
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(initialMode)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setMode = useCallback((next: Mode) => {
    setModeState(next)
    document.documentElement.dataset.mode = next
    writeStorage(STORAGE_KEY, next)
  }, [])

  const toggleMode = useCallback(() => {
    setModeState((current) => {
      const next: Mode = current === 'bounty' ? 'plain' : 'bounty'
      document.documentElement.dataset.mode = next
      writeStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  // Reconcile once on mount in case the blocking script was blocked entirely.
  useEffect(() => {
    const stored = readStorage(STORAGE_KEY)
    if (stored === 'plain' || stored === 'bounty') {
      document.documentElement.dataset.mode = stored
      setModeState(stored)
    }
  }, [])

  const value = useMemo<ModeValue>(
    () => ({
      mode,
      setMode,
      toggleMode,
      prefersReducedMotion,
      motionOff: mode === 'plain' || prefersReducedMotion,
    }),
    [mode, setMode, toggleMode, prefersReducedMotion],
  )

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}

export function useMode(): ModeValue {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used inside <ModeProvider>')
  return ctx
}
