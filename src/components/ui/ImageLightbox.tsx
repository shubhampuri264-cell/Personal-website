import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { GalleryImage } from '@/data/types'
import { useBodyScrollLock, useFocusTrap } from '@/hooks/useMisc'
import { Icon } from '@/lib/icons'
import styles from './ImageLightbox.module.css'

interface ImageLightboxProps {
  image: GalleryImage | null
  onClose: () => void
}

/**
 * Full-size view for a gallery tile. Same shape as VideoModal — portal, dialog
 * role, Escape bound only while open, backdrop click closes — so both modals on
 * the site behave identically and there is only one set of rules to remember.
 *
 * The full-size file is not requested until something is actually opened: the
 * grid tiles reference the 700px thumbnails and nothing else.
 */
export function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const open = Boolean(image)

  useBodyScrollLock(open)
  useFocusTrap(ref, open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!image) return null

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={image.caption}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <figure className={styles.shell} ref={ref}>
        <button type="button" className={styles.close} onClick={onClose} autoFocus>
          <Icon name="close" size={20} />
          <span className="sp-visually-hidden">Close image</span>
        </button>

        <img
          className={styles.image}
          src={image.full}
          alt={image.alt}
          width={1400}
          height={1050}
          decoding="async"
        />

        <figcaption className={styles.caption}>{image.caption}</figcaption>
      </figure>
    </div>,
    document.body,
  )
}
