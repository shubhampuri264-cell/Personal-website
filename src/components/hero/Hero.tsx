import { doors, profile } from '@/data'
import { Icon } from '@/lib/icons'
import { Door } from './Door'
import styles from './Hero.module.css'

const SOCIAL_ICON: Record<string, string> = {
  github: 'github',
  linkedin: 'linkedin',
  email: 'mail',
  phone: 'phone',
}

/**
 * The doors sit here, in the hero, as the front page of the site.
 *
 * The ScrollCue below them is load-bearing, not decoration: it is the signal
 * that the page continues. Without it the doors read as a gate, and a recruiter
 * who does not want to click one leaves. The whole design rests on the doors
 * being *optional*.
 */
export function Hero() {
  const ordered = [...doors].sort((a, b) => a.order - b.order)

  return (
    <div className={styles.hero}>
      <div className={styles.intro}>
        <img
          className={styles.photo}
          src={profile.photo}
          alt={`${profile.name}, ${profile.role}`}
          width={168}
          height={168}
          loading="eager"
          fetchPriority="high"
        />

        {/* Availability, not job title — the title is already in the tagline and
            the name, and "is this person looking?" is the one question a
            recruiter arrives with. The pulsing dot reads as a status light,
            which is why this line sits here rather than lower down. */}
        <p className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          <span>
            {profile.availability}
            <span className={styles.eyebrowSep} aria-hidden="true">
              {' · '}
            </span>
            <span className={styles.eyebrowWhere}>{profile.workLocation}</span>
          </span>
        </p>

        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.tagline}>{profile.tagline}</p>
        <p className={styles.blurb}>{profile.blurb}</p>

        <div className={styles.ctaRow}>
          <a className={styles.primaryCta} href={profile.resumeUrl} download>
            <Icon name="download" size={16} />
            Download resume
          </a>

          <ul className={styles.social}>
            {profile.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.socialLink}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer noopener' : undefined}
                  aria-label={link.label}
                >
                  <Icon name={SOCIAL_ICON[link.kind] ?? 'external'} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav className={styles.doorsWrap} aria-label="Jump to a section">
        <p className={styles.doorsLabel}>Pick a door, or just scroll</p>
        <ul className={styles.doors}>
          {ordered.map((door, i) => (
            <Door key={door.id} door={door} index={i} />
          ))}
        </ul>
      </nav>

      <p className={styles.cue} aria-hidden="true">
        <span>Everything is below too</span>
        <Icon name="chevron-down" size={18} className={styles.cueIcon} />
      </p>
    </div>
  )
}
