import { certifications, education, profile } from '@/data'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/lib/icons'
import styles from './EducationSection.module.css'

export function EducationSection() {
  return (
    <Section id="education" eyebrow="Where I studied" title="Education">
      {education.map((item, i) => (
        <Reveal key={item.slug} index={i}>
          <article className={styles.card}>
            <div className={styles.head}>
              <span className={styles.icon} aria-hidden="true">
                <Icon name="cap" size={24} />
              </span>
              <div className={styles.headText}>
                <h3 className={styles.degree}>
                  {item.degree}
                  {item.honors?.map((honor) => (
                    <span key={honor} className={styles.honor}>
                      {honor}
                    </span>
                  ))}
                </h3>
                <p className={styles.school}>
                  {item.school} · {item.location}
                </p>
              </div>

              {/* The diploma sits with the degree, not down in Certifications.
                  A degree and a workshop certificate are not the same weight of
                  claim, and putting them in one list says they are. */}
              <div className={styles.headMeta}>
                <span className={styles.date} data-status={item.status}>
                  {item.displayDate}
                </span>
                {item.diplomaUrl && (
                  <a
                    className={styles.diploma}
                    href={item.diplomaUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Icon name="cert" size={14} />
                    View diploma
                  </a>
                )}
              </div>
            </div>

            {/* Cum Laude is not repeated here. It sits inline with the degree
                because it qualifies the degree; these are semester awards, which
                is a separate claim and reads as padding when the two are mixed. */}
            {item.awards && item.awards.length > 0 && (
              <div className={styles.courses}>
                <p className={styles.coursesLabel}>Honors</p>
                <ul className={styles.awardList}>
                  {item.awards.map((award) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.courses}>
              <p className={styles.coursesLabel}>Relevant coursework</p>
              <ul className={styles.courseList}>
                {item.coursework.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      ))}

      {/* Course completions live here rather than in Skills. Finishing a course
          is a different claim from having shipped with something, and each one
          opens the actual PDF so the claim is checkable in one click. */}
      <Reveal className={styles.certs}>
        <h3 className={styles.certsLabel}>Certifications</h3>
        <ul className={styles.certList}>
          {certifications.map((cert) => (
            <li key={cert.slug}>
              <a
                className={styles.cert}
                href={cert.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={styles.certIcon} aria-hidden="true">
                  <Icon name="cert" size={18} />
                </span>
                <span className={styles.certBody}>
                  <span className={styles.certName}>{cert.name}</span>
                  <span className={styles.certMeta}>
                    {cert.issuer} · {cert.date}
                  </span>
                </span>
                <Icon name="external" size={14} className={styles.certGo} />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className={styles.resumeRow}>
        <p className={styles.resumeCopy}>Prefer the one-page version?</p>
        <a className={styles.resumeCta} href={profile.resumeUrl} download>
          <Icon name="download" size={16} />
          Download resume (PDF)
        </a>
      </Reveal>
    </Section>
  )
}
