import type { GalleryGroup } from './types'

/**
 * Off-the-clock builds. Separate from Hardware because that section is about
 * what I make with a microcontroller or a printer; this one is about the rig
 * itself and whatever else ends up here later.
 */
export const hobbyGroups: GalleryGroup[] = [
  {
    id: 'pc',
    label: 'PC Build',
    blurb: 'Specced, assembled and cable-managed by hand',
    accent: 'cyan',
    items: [
      // TODO: uncomment once pc-build-{thumb,full}.webp exist in public/images/hobbies/.
      // Drop the photo in ~/Downloads, point the `pc-build` job in
      // scripts/prep-gallery-images.mjs at it, and run that script.
      // {
      //   id: 'pc-build',
      //   thumb: '/images/hobbies/pc-build-thumb.webp',
      //   full: '/images/hobbies/pc-build-full.webp',
      //   caption: 'Custom desktop build',
      //   alt: 'A custom-built desktop PC',
      // },
    ],
  },
]
