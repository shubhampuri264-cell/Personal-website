import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { doors, profile } from '@/data'
import type { SectionId } from '@/data/types'
import { useBodyScrollLock } from '@/hooks/useMisc'
import { cn } from '@/lib/cn'
import { Icon } from '@/lib/icons'
import { ModeToggle } from '@/components/ui/ModeToggle'
import styles from './NavBar.module.css'

/**
 * Sticky nav. Scroll state is a class toggle, never an inline style write —
 * the old build wrote background and boxShadow inline on every scroll frame,
 * which both cost a style recalc per frame and permanently overrode the theme.
 */
export function NavBar({ activeSection }: { activeSection: SectionId }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const ordered = [...doors].sort((a, b) => a.order - b.order)

  useBodyScrollLock(menuOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className={cn(styles.bar, scrolled && styles.scrolled)}>
      <div className={cn('sp-container', styles.inner)}>
        <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.brandMark} aria-hidden="true">
            SP
          </span>
          <span className={styles.brandName}>{profile.name}</span>
        </Link>

        <nav
          className={cn(styles.links, menuOpen && styles.linksOpen)}
          aria-label="Sections"
          id="primary-nav"
        >
          {ordered.map((door) => (
            <NavLink
              key={door.id}
              to={door.path}
              onClick={() => setMenuOpen(false)}
              className={cn(styles.link, activeSection === door.id && styles.linkActive)}
              aria-current={activeSection === door.id ? 'true' : undefined}
            >
              {door.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ModeToggle />
          <a className={styles.resume} href={profile.resumeUrl} download>
            <Icon name="download" size={15} />
            <span className={styles.resumeLabel}>Resume</span>
          </a>
          {/* No icon-only actions in the nav — every control carries a word. */}
          <button
            type="button"
            className={styles.burger}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
            <span className="sp-visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
