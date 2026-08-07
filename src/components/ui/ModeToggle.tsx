import { useMode } from '@/context/ModeContext'
import styles from './ModeToggle.module.css'

/**
 * The recruiter escape hatch.
 *
 * A real `role="switch"` with a visible text label, not an icon-only button —
 * an unlabelled icon toggle is guesswork for everyone and unusable with a
 * screen reader.
 */
export function ModeToggle() {
  const { mode, toggleMode } = useMode()
  const plain = mode === 'plain'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={plain}
      className={styles.toggle}
      onClick={toggleMode}
      title={plain ? 'Switch to poster view' : 'Switch to plain view'}
    >
      <span className={styles.label}>{plain ? 'Plain' : 'Poster'}</span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
    </button>
  )
}
