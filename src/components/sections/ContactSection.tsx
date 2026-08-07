import { profile } from '@/data'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/lib/icons'
import styles from './ContactSection.module.css'

const ICON: Record<string, string> = {
  email: 'mail',
  phone: 'phone',
  github: 'github',
  linkedin: 'linkedin',
}

/**
 * "GITHUB / GitHub" is a stutter — the label above already named the service,
 * so the line under it should carry the handle instead of repeating.
 */
function displayValue(kind: string, label: string, href: string): string {
  if (kind !== 'github' && kind !== 'linkedin') return label
  try {
    return new URL(href).pathname.replace(/^\/|\/$/g, '')
  } catch {
    return label
  }
}

/** Prefilled so the reply lands in a thread that already says what it is about. */
const MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent(
  'Software engineering role: Shubham Puri',
)}`

/**
 * Email is not one of four equal tiles. It is the conversion, so it gets the
 * full row and the only filled button on the page; phone, GitHub and LinkedIn
 * stay available underneath at secondary weight.
 */
export function ContactSection() {
  const secondary = profile.links.filter((l) => l.kind !== 'email')

  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Contact"
      intro={`${profile.availability}, ${profile.workLocation}. Fastest way to reach me is email.`}
    >
      <Reveal className={styles.primary}>
        <div className={styles.primaryCopy}>
          <p className={styles.primaryLabel}>Email</p>
          <p className={styles.primaryValue}>{profile.email}</p>
        </div>
        <a className={styles.primaryCta} href={MAILTO}>
          <Icon name="mail" size={17} />
          Email me
        </a>
      </Reveal>

      <ul className={styles.grid}>
        {secondary.map((link, i) => (
          <Reveal as="li" key={link.href} index={i} className={styles.cell}>
            {/* Real mailto:/tel: links, not plain text — a recruiter on a phone
                should be able to tap the number. */}
            <a
              href={link.href}
              className={styles.tile}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer noopener' : undefined}
            >
              <span className={styles.icon} aria-hidden="true">
                <Icon name={ICON[link.kind] ?? 'external'} size={20} />
              </span>
              <span className={styles.kind}>{link.kind}</span>
              <span className={styles.value}>
                {displayValue(link.kind, link.label, link.href)}
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
