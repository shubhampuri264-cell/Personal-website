import { useEffect, useState } from 'react'
import { doors, profile } from '@/data'
import type { SectionId } from '@/data/types'
import styles from './Chrome.module.css'

export function SkipLink() {
  return (
    <a href="#main" className={styles.skip}>
      Skip to content
    </a>
  )
}

/**
 * SPA route changes are silent to a screen reader — nothing is announced when
 * the URL and the visible section change. This closes that gap.
 */
export function RouteAnnouncer({ sectionId }: { sectionId: SectionId }) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const label = doors.find((d) => d.id === sectionId)?.label ?? 'Home'
    // A tick of delay so the live region reliably re-announces on repeat visits.
    const t = window.setTimeout(() => setMessage(`${label} section`), 120)
    return () => window.clearTimeout(t)
  }, [sectionId])

  return (
    <p aria-live="polite" aria-atomic="true" className="sp-visually-hidden">
      {message}
    </p>
  )
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="sp-container">
        <div className={styles.row}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className={styles.built}>
            Built with React, TypeScript and Vite. Deployed on Vercel.
          </p>
          <a className={styles.email} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
