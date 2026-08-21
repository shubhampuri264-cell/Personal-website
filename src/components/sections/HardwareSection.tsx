import { useState } from 'react'
import { hardwareGroups } from '@/data'
import type { GalleryImage } from '@/data/types'
import { Section } from '@/components/layout/Section'
import { ImageGrid } from '@/components/ui/ImageGrid'
import { ImageLightbox } from '@/components/ui/ImageLightbox'

/**
 * Filed under hobby builds, with no intro paragraph.
 *
 * A printer, a breadboard and a robotics kit are not engineering experience,
 * and a section that implies otherwise invites a reader to discount the
 * sections that are. The eyebrow does that job in two words. A paragraph
 * explaining why hobby work is on the page would only draw attention to the
 * question, so the photos are left to speak for themselves.
 */
export function HardwareSection() {
  const [open, setOpen] = useState<GalleryImage | null>(null)

  return (
    <Section id="hardware" eyebrow="Hobby builds" title="Hardware">
      <ImageGrid groups={hardwareGroups} onOpen={setOpen} />
      <ImageLightbox image={open} onClose={() => setOpen(null)} />
    </Section>
  )
}
