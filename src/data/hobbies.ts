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
    items: [
      img(
        'pc-full-build',
        'The finished build',
        'The interior of a white PC case lit green, showing a white air cooler, a white Radeon graphics card, two RGB fans on the right panel and more fans below the power supply shroud',
      ),
      img(
        'pc-interior-lit',
        'RGB across the RAM, the fans and the card',
        'A close view inside the case under blue and magenta light, with memory sticks lit through the cooler, a white XFX Radeon card across the middle and two RGB fans on the right',
      ),
      img(
        'pc-cooler-gpu',
        'Cooler fan and the card, side on',
        'The cooler fan glowing magenta above a white XFX Radeon graphics card, with the case interior lit purple around them',
      ),
      img(
        'pc-intake-fans',
        'Intake fans in the dark',
        'Two case fans lit deep blue in a dark room, stacked one above the other behind the case panel',
      ),
    ],
  },
]
