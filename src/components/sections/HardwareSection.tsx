import { useState } from 'react'
import { hardwareGroups } from '@/data'
import type { GalleryImage } from '@/data/types'
import { Section } from '@/components/layout/Section'
import { ImageGrid } from '@/components/ui/ImageGrid'
import { ImageLightbox } from '@/components/ui/ImageLightbox'

/**
 * The work that does not live in a repo. Same reasoning as the Skills section:
 * a claim is worth more with the evidence attached, and for a build the evidence
 * is a photo of the thing running on a table.
 */
export function HardwareSection() {
  const [open, setOpen] = useState<GalleryImage | null>(null)

  return (
    <Section
      id="hardware"
      eyebrow="What I have built by hand"
      title="Hardware"
      intro="Microcontrollers, 3D prints and robotics kits. Everything below is mine, photographed as built."
    >
      <ImageGrid groups={hardwareGroups} onOpen={setOpen} />
      <ImageLightbox image={open} onClose={() => setOpen(null)} />
    </Section>
  )
}
