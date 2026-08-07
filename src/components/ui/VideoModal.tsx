import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useBodyScrollLock, useFocusTrap } from '@/hooks/useMisc'
import { Icon } from '@/lib/icons'
import styles from './VideoModal.module.css'

interface VideoModalProps {
  youtubeId: string | null
  title: string
  onClose: () => void
}

/**
 * Demo lightbox. The iframe is only created while open, so no YouTube request
 * is made until someone actually asks for the video.
 *
 * `allow="autoplay"` is required — the embed URL carries `autoplay=1` and
 * Chrome blocks it without the attribute, which is why the old version
 * silently opened to a still frame.
 */
export function VideoModal({ youtubeId, title, onClose }: VideoModalProps) {
  const ref = useRef<HTMLDivElement>(null)
  const open = Boolean(youtubeId)

  useBodyScrollLock(open)
  useFocusTrap(ref, open)

  useEffect(() => {
    if (!open) return
    // Bound only while open — a global Escape handler firing on a closed modal
    // is how you end up stealing the key from something else.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} demo video`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.shell} ref={ref}>
        <button type="button" className={styles.close} onClick={onClose} autoFocus>
          <Icon name="close" size={20} />
          <span className="sp-visually-hidden">Close video</span>
        </button>

        <iframe
          className={styles.frame}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={`${title} demo`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>,
    document.body,
  )
}
