import type { BountyItem, SectionId } from '@/data/types'
import { Reveal } from '@/components/ui/Reveal'
import { BountyCard } from './BountyCard'
import styles from './BountyGrid.module.css'

interface BountyGridProps {
  items: BountyItem[]
  sectionId: SectionId
  focusedSlug?: string | null
  onWatchDemo?: (youtubeId: string, title: string) => void
  /** `wide` gives each poster more room — used for experience. */
  density?: 'default' | 'wide'
}

/**
 * Every item, visible at once. Not a carousel, not paginated, not virtualised.
 *
 * `content-visibility: auto` would be the obvious win on a long page here and
 * is deliberately NOT used — it removes offscreen content from find-in-page,
 * which breaks the one thing a recruiter actually does on a portfolio.
 */
export function BountyGrid({
  items,
  sectionId,
  focusedSlug,
  onWatchDemo,
  density = 'default',
}: BountyGridProps) {
  return (
    <div className={styles.grid} data-density={density}>
      {items.map((item, i) => (
        <Reveal key={item.slug} index={i} className={styles.cell}>
          <BountyCard
            item={item}
            sectionId={sectionId}
            focused={focusedSlug === item.slug}
            onWatchDemo={onWatchDemo}
          />
        </Reveal>
      ))}
    </div>
  )
}
