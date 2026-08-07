import { useCallback, useEffect, useRef, useState } from 'react'
import { useMode } from '@/context/ModeContext'
import type { BountyItem } from '@/data/types'
import { Icon } from '@/lib/icons'
import { navFlags, releaseSpyAfterScroll } from '@/lib/navFlags'
import styles from './BountyRail.module.css'

interface BountyRailProps {
  items: BountyItem[]
  label: string
}

/**
 * The featured arrow-rail. A shortcut, never the only way to reach content.
 *
 * Chips carry a title and a reward only — they are NOT duplicate cards.
 * Duplicating the full text would give find-in-page two hits for the same item
 * and make a screen reader announce everything twice. Clicking a chip scrolls
 * to and focuses the real card in the grid below.
 *
 * Scrolling itself is native `overflow-x: auto` + scroll-snap, so touch swipe
 * and keyboard work with no JavaScript at all; the arrows only call scrollBy.
 */
export function BountyRail({ items, label }: BountyRailProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const { motionOff } = useMode()

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    sync()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const nudge = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({
      left: dir * Math.max(240, el.clientWidth * 0.7),
      behavior: motionOff ? 'auto' : 'smooth',
    })
  }

  const jumpToCard = (slug: string) => {
    const card = document.getElementById(`item-${slug}`)
    if (!card) return

    navFlags.suspendSpy = true
    card.scrollIntoView({ behavior: motionOff ? 'auto' : 'smooth', block: 'center' })

    const heading = card.querySelector<HTMLElement>('h3 a')
    heading?.focus({ preventScroll: true })
    releaseSpyAfterScroll(motionOff ? 300 : 1000)
  }

  if (items.length < 2) return null

  return (
    <div className={styles.rail}>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => nudge(-1)}
            aria-disabled={atStart}
            aria-label="Scroll featured list left"
          >
            <Icon name="arrow-left" size={16} />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => nudge(1)}
            aria-disabled={atEnd}
            aria-label="Scroll featured list right"
          >
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>

      <ul className={styles.track} ref={trackRef}>
        {items.map((item) => (
          <li key={item.slug} className={styles.chipWrap}>
            <button type="button" className={styles.chip} onClick={() => jumpToCard(item.slug)}>
              <span className={styles.chipValue}>{item.bounty.value}</span>
              <span className={styles.chipTitle}>{item.title}</span>
              <span className={styles.chipUnit}>{item.bounty.unit}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
