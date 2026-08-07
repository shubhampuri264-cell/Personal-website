import { useEffect, useRef, useState } from 'react'
import { useMode } from '@/context/ModeContext'
import { cn } from '@/lib/cn'
import styles from './Reveal.module.css'

interface RevealProps {
  children: React.ReactNode
  /** Stagger index — multiplied by 60ms. Capped so long grids never crawl. */
  index?: number
  className?: string
  as?: 'div' | 'li' | 'article' | 'section'
}

/**
 * Scroll-in reveal. Plain IntersectionObserver plus a CSS keyframe rather than
 * a Motion component: this runs on ~20 elements, needs no React re-render, and
 * animating it on the compositor is free. Motion is reserved for things CSS
 * genuinely cannot do (exit animations, shared-element transitions).
 *
 * Transforms are applied to this wrapper, never to a registered <section> —
 * see SectionRegistry for why that matters to scrolling.
 */
export function Reveal({ children, index = 0, className, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const { motionOff } = useMode()
  const [shown, setShown] = useState(motionOff)

  useEffect(() => {
    if (motionOff) {
      setShown(true)
      return
    }
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        observer.disconnect()
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [motionOff])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(styles.reveal, shown && styles.shown, className)}
      style={{ '--reveal-delay': `${Math.min(index, 6) * 60}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
