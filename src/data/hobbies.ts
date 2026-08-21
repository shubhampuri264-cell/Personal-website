import type { GalleryGroup } from './types'

const BASE = '/images/hobbies'

const img = (id: string, caption: string, alt: string) => ({
  id,
  thumb: `${BASE}/${id}-thumb.webp`,
  full: `${BASE}/${id}-full.webp`,
  caption,
  alt,
})

/**
 * Off-the-clock builds. Separate from Hardware because that section is about
 * what I make with a microcontroller or a printer; this one is about the rig
 * itself and whatever else ends up here later.
 *
 * Unlike Hardware, these photos keep their backgrounds. The case, the glass and
 * the light thrown onto the panels are the subject — a motherboard cut out onto
 * transparency is a picture of a part, not of a build.
 */
export const hobbyGroups: GalleryGroup[] = [
  {
    id: 'pc',
    label: 'PC Build',
    blurb: 'Specced, assembled and cable-managed by hand',
    accent: 'cyan',
    /*
     * Two frames, not four. The other two were the same case from a slightly
     * different angle under a different colour of the same lighting, and a
     * gallery of near-duplicates reads as padding. One wide shot of the build
     * and one detail shot is the whole argument.
     */
    items: [
      img(
        'pc-full-build',
        'The finished build',
        'The interior of a white PC case lit green, showing a white air cooler, a white Radeon graphics card, two RGB fans on the right panel and more fans below the power supply shroud',
      ),
      img(
        'pc-intake-fans',
        'Intake fans in the dark',
        'Two case fans lit deep blue in a dark room, stacked one above the other behind the case panel',
      ),
    ],
  },
]
