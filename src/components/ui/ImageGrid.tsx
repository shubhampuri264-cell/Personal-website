import type { GalleryGroup, GalleryImage } from '@/data/types'
import { Reveal } from '@/components/ui/Reveal'
import styles from './ImageGrid.module.css'

interface ImageGridProps {
  groups: GalleryGroup[]
  onOpen: (image: GalleryImage) => void
}

/**
 * Grouped photo grid, shared by Hardware and Hobbies.
 *
 * Every caption is real text in the DOM — no carousel, no `content-visibility`,
 * nothing that hides a build from Ctrl+F. Same rule BountyGrid states for cards.
 */
export function ImageGrid({ groups, onOpen }: ImageGridProps) {
  return (
    <div className={styles.groups}>
      {groups.map((group) => (
        <section key={group.id} className={styles.group} data-accent={group.accent}>
          <header className={styles.groupHead}>
            <h3 className={styles.groupTitle}>{group.label}</h3>
            <p className={styles.groupBlurb}>{group.blurb}</p>
          </header>

          {group.items.length === 0 ? (
            <p className={styles.empty}>Photo coming soon.</p>
          ) : (
            <ul className={styles.grid}>
              {group.items.map((item, i) => (
                <Reveal key={item.id} index={i} as="li" className={styles.cell}>
                  <button
                    type="button"
                    className={styles.tile}
                    onClick={() => onOpen(item)}
                    aria-label={`View ${item.caption} full size`}
                  >
                    <img
                      className={styles.image}
                      src={item.thumb}
                      alt={item.alt}
                      width={600}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.caption}>{item.caption}</span>
                  </button>
                </Reveal>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
