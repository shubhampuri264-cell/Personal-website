import { Link } from 'react-router-dom'
import { useDoorTransition } from '@/context/DoorTransition'
import type { Door as DoorData } from '@/data/types'
import styles from './Door.module.css'

/**
 * A door is a real <Link>. Its onClick starts the cover-and-open animation but
 * NEVER calls preventDefault — routing happens through react-router exactly as
 * it would without the animation. If the transition fails, is disabled, or the
 * user has reduced motion on, the link still works and the page still lands in
 * the right place. Decoration on top of working navigation, not in place of it.
 */
export function Door({ door, index }: { door: DoorData; index: number }) {
  const { openDoor } = useDoorTransition()

  return (
    <li className={styles.slot} style={{ '--i': index } as React.CSSProperties}>
      <Link
        to={door.path}
        className={styles.door}
        data-accent={door.accent}
        onClick={() => openDoor(door.id, door.accent, door.label)}
      >
        <span className={styles.panel} aria-hidden="true">
          <span className={styles.seam} />
          <span className={styles.knob} />
        </span>

        <span className={styles.plate}>
          {door.count && <span className={styles.count}>{door.count}</span>}
          <span className={styles.label}>{door.label}</span>
          <span className={styles.blurb}>{door.blurb}</span>
        </span>
      </Link>
    </li>
  )
}
