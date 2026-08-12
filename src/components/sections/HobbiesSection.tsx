import { useState } from 'react'
import { hobbyGroups } from '@/data'
import type { GalleryImage } from '@/data/types'
import { Section } from '@/components/layout/Section'
import { ImageGrid } from '@/components/ui/ImageGrid'
import { ImageLightbox } from '@/components/ui/ImageLightbox'

/**
 * Off the clock. Kept separate from Hardware because that section is about what
 * a board or a printer produces, and this one is about the machine itself.
 */
export function HobbiesSection() {
  const [open, setOpen] = useState<GalleryImage | null>(null)

  return (
    <Section
      id="hobbies"
      eyebrow="Off the clock"
      title="Hobbies"
      intro="What I build when nobody is grading it."
    >
      <ImageGrid groups={hobbyGroups} onOpen={setOpen} />
      <ImageLightbox image={open} onClose={() => setOpen(null)} />
    </Section>
  )
}
