import type { Project } from '@/data/types'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import styles from './CompactWorkList.module.css'

/**
 * The non-featured projects. Still real content in the DOM and still
 * findable — just weighted lower so the five featured posters carry the page.
 */
export function CompactWorkList({ items }: { items: Project[] }) {
  if (items.length === 0) return null

  return (
    <Reveal className={styles.wrap}>
      <h3 className={styles.heading}>More work</h3>
      <ul className={styles.list}>
        {items.map((item) => {
          const source = item.links.find((l) => l.kind === 'github')
          return (
            <li key={item.slug} id={`item-${item.slug}`} className={styles.row}>
              <div className={styles.main}>
                <p className={styles.name}>{item.title}</p>
                <p className={styles.desc}>{item.summary}</p>
                {/*
                  One bullet, not all of them. The summary says what the thing
                  is, which every row already had and which is why the section
                  read as a list of titles. The bullet says what was actually
                  built, which is the part a reader is here for. A second
                  bullet would start competing with the featured posters above.
                */}
                {item.bullets[0] && <p className={styles.detail}>{item.bullets[0]}</p>}
                <ul className={styles.tech}>
                  {item.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.side}>
                {item.bounty && (
                  <span className={styles.stat}>
                    <strong>{item.bounty.value}</strong>
                    <span>{item.bounty.unit}</span>
                  </span>
                )}
                {source && (
                  <a
                    href={source.href}
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Icon name="github" size={15} />
                    <span className="sp-visually-hidden">{item.title} source on GitHub</span>
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </Reveal>
  )
}
