import { useEffect, useRef } from 'react'
import { useSectionRegistry } from '@/context/SectionRegistry'
import type { SectionId } from '@/data/types'
import { cn } from '@/lib/cn'
import styles from './Section.module.css'

interface SectionProps {
  id: SectionId
  title: string
  eyebrow?: string
  intro?: string
  children: React.ReactNode
  className?: string
}

/**
 * The single place that guarantees a section is real, addressable content.
 *
 * Every section is rendered unconditionally by PortfolioPage — never lazily,
 * never behind a route swap, never display:none. That is what makes Ctrl+F,
 * plain scrolling and deep links all work at once.
 *
 * Note the transform rule: reveal animations wrap the CHILDREN, never this
 * element. A transformed <section> reports the wrong offset to scrollIntoView.
 */
export function Section({ id, title, eyebrow, intro, children, className }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { register } = useSectionRegistry()

  useEffect(() => {
    register(id, ref.current)
    return () => register(id, null)
  }, [id, register])

  return (
    <section id={id} ref={ref} className={cn(styles.section, className)}>
      <div className="sp-container">
        <header className={styles.head}>
          {eyebrow && <p className="sp-eyebrow">{eyebrow}</p>}
          {/*
            tabIndex -1 so the door transition can move focus here on arrival.
            SPA navigation does not move focus by itself, and without this a
            keyboard or screen-reader user lands nowhere.
          */}
          <h2 id={`heading-${id}`} tabIndex={-1} className={styles.title}>
            {title}
          </h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>

        {children}
      </div>
    </section>
  )
}
