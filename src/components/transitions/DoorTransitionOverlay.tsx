import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'motion/react'
import { DOOR_TIMING, useDoorTransition } from '@/context/DoorTransition'
import { useMode } from '@/context/ModeContext'
import styles from './DoorTransitionOverlay.module.css'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The two swinging panels.
 *
 * `aria-hidden` + `pointer-events: none` throughout: this is scenery. It must
 * never trap focus, never be announced, and never intercept a click. The
 * navigation underneath it has already happened.
 *
 * Motion is used here rather than CSS for one specific reason — AnimatePresence
 * keeps the element mounted through its exit animation, which plain CSS cannot
 * do without hand-rolling a state machine.
 */
export function DoorTransitionOverlay() {
  const { state } = useDoorTransition()
  const { motionOff } = useMode()

  // Not hidden — not rendered. A hidden animated overlay still costs layers.
  if (motionOff) return null

  const covering = state?.phase === 'cover'

  return createPortal(
    <AnimatePresence>
      {state && (
        <m.div
          className={styles.overlay}
          data-accent={state.accent}
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
        >
          <m.div
            className={styles.panel}
            initial={{ x: '-100%' }}
            animate={{ x: covering ? '0%' : '-100%' }}
            transition={{
              duration: (covering ? DOOR_TIMING.COVER_MS : DOOR_TIMING.OPEN_MS) / 1000,
              ease: EASE,
            }}
          >
            <span className={styles.edge} />
          </m.div>

          <m.div
            className={`${styles.panel} ${styles.panelRight}`}
            initial={{ x: '100%' }}
            animate={{ x: covering ? '0%' : '100%' }}
            transition={{
              duration: (covering ? DOOR_TIMING.COVER_MS : DOOR_TIMING.OPEN_MS) / 1000,
              ease: EASE,
            }}
          >
            <span className={styles.edge} />
          </m.div>

          <m.span
            className={styles.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: covering ? 1 : 0 }}
            transition={{ duration: 0.14 }}
          >
            {state.label}
          </m.span>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
