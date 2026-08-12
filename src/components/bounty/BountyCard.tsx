import { Link } from 'react-router-dom'
import type { BountyItem, SectionId } from '@/data/types'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'
import { hashToUnit } from '@/lib/scroll'
import styles from './BountyCard.module.css'

/*
 * There is no per-kind badge word and no rule line above the reward. The poster
 * *look* is the skin; the poster *vocabulary* ("WANTED", "CREW", "DEAD OR
 * ALIVE") was costume sitting on top of real employment history, and a reader
 * has to decode it before reaching anything that helps them. Status is the one
 * label that survived, because it carries information rather than theme.
 */
const STATUS_LABEL: Record<NonNullable<BountyItem['status']>, string> = {
  shipped: 'Shipped',
  'in-progress': 'Active',
  archived: 'Archived',
}

const LINK_ICON: Record<string, string> = {
  github: 'github',
  live: 'external',
  demo: 'play',
  cert: 'cert',
  resume: 'download',
}

interface BountyCardProps {
  item: BountyItem
  sectionId: SectionId
  /** True when the URL deep-links to this item. */
  focused?: boolean
  onWatchDemo?: (youtubeId: string, title: string, portrait?: boolean) => void
}

function monogram(title: string): string {
  return title
    .split(/\s+/)
    .filter((w) => /[a-z0-9]/i.test(w[0] ?? ''))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('')
}

/**
 * One poster. Renders a job, a project or a hackathon with no per-kind layout
 * branching — every difference is a value read off `item`.
 *
 * Slots ③ name, ④ reward and ⑤ summary are required. Everything else collapses
 * when its data is absent, so a card with no links has no empty action row.
 */
export function BountyCard({ item, sectionId, focused, onWatchDemo }: BountyCardProps) {
  // Tilt is seeded from the slug so it is stable across renders, and it is
  // applied to the frame layer only — never to the text container, and never
  // together with backdrop-filter, which would blur the type.
  const tilt = (hashToUnit(item.slug) * 1.2).toFixed(2)

  const titleId = `title-${item.slug}`
  const demoLink = item.links.find((l) => l.kind === 'demo')
  const otherLinks = item.links.filter((l) => l.kind !== 'demo')

  return (
    <article
      id={`item-${item.slug}`}
      aria-labelledby={titleId}
      className={cn(styles.card, focused && styles.focused)}
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
      data-kind={item.kind}
    >
      <div className={styles.frame} aria-hidden="true" />

      {/* Rendered only when there is a status — otherwise this is an empty
          padded bar that pushes every card down for nothing. */}
      {item.status && (
        <header className={styles.strip}>
          <span className={styles.status} data-status={item.status}>
            {STATUS_LABEL[item.status]}
          </span>
        </header>
      )}

      <div className={styles.body}>
        <span className={styles.monogram} aria-hidden="true">
          {monogram(item.title)}
        </span>

        {/* Slot 3 — the stretched link lives here so the card is clickable
            without illegally nesting the action links inside an <a>. */}
        <h3 id={titleId} className={styles.title}>
          <Link to={`/${sectionId}/${item.slug}`} className={styles.titleLink}>
            {item.title}
          </Link>
        </h3>
        <p className={styles.subtitle}>{item.subtitle}</p>

        <p className={styles.meta}>
          <Icon name="calendar" size={13} />
          <span>{item.dates.display}</span>
          {item.location && (
            <>
              <span className={styles.metaSep} aria-hidden="true">
                ·
              </span>
              <Icon name="pin" size={13} />
              <span>{item.location}</span>
            </>
          )}
        </p>

        {/* Slot 4 — the headline number. Always present. */}
        <div className={styles.reward}>
          <strong className={styles.rewardValue}>{item.bounty.value}</strong>
          <span className={styles.rewardUnit}>{item.bounty.unit}</span>
          {item.bounty.caption && <span className={styles.rewardCaption}>{item.bounty.caption}</span>}
        </div>

        {/* Slot 5 — summary, then bullets if there are any. */}
        <p className={styles.summary}>{item.summary}</p>

        {item.bullets.length > 0 && (
          <ul className={styles.bullets}>
            {item.bullets.map((bullet) => (
              <li key={bullet}>
                <Icon name="check" size={14} className={styles.bulletIcon} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/*
          Native <details>, not a JS accordion. It is keyboard-operable and
          screen-reader-labelled for free, it survives with JavaScript broken,
          and Chrome expands it automatically for find-in-page — so the long
          text is still reachable by Ctrl+F while collapsed. Deep-linking to the
          item opens it, which is what makes /projects/agon worth sharing.
        */}
        {item.caseStudy && (
          <details className={styles.study} open={focused}>
            <summary className={styles.studySummary}>
              <Icon name="chevron-down" size={14} className={styles.studyChevron} />
              Read the full case study
            </summary>

            <div className={styles.studyBody}>
              <section>
                <h4 className={styles.studyHead}>The problem</h4>
                <p>{item.caseStudy.problem}</p>
              </section>

              <section>
                <h4 className={styles.studyHead}>The constraint</h4>
                <p>{item.caseStudy.constraint}</p>
              </section>

              <section>
                <h4 className={styles.studyHead}>What I tried</h4>
                <ol className={styles.studySteps}>
                  {item.caseStudy.attempts.map((attempt) => (
                    <li key={attempt}>{attempt}</li>
                  ))}
                </ol>
              </section>

              <section>
                <h4 className={styles.studyHead}>What shipped</h4>
                <p>{item.caseStudy.shipped}</p>
              </section>

              <section>
                <h4 className={styles.studyHead}>What I would change</h4>
                <p>{item.caseStudy.next}</p>
              </section>
            </div>
          </details>
        )}

        {item.tech.length > 0 && (
          <ul className={styles.tech} aria-label="Tech used">
            {item.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        {(otherLinks.length > 0 || demoLink) && (
          <div className={styles.actions}>
            {otherLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.action}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer noopener' : undefined}
              >
                <Icon name={LINK_ICON[link.kind] ?? 'external'} size={15} />
                {link.label}
              </a>
            ))}

            {demoLink && onWatchDemo && (
              <button
                type="button"
                className={cn(styles.action, styles.actionPrimary)}
                onClick={() => onWatchDemo(demoLink.href, item.title, demoLink.portrait)}
              >
                <Icon name="play" size={13} />
                {demoLink.label}
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
