import type { GalleryGroup } from './types'

const BASE = '/images/hardware'

const img = (id: string, caption: string, alt: string) => ({
  id,
  thumb: `${BASE}/${id}-thumb.webp`,
  full: `${BASE}/${id}-full.webp`,
  caption,
  alt,
})

/**
 * Hobby making, not engineering experience, and framed that way on the page.
 * The value of the section is not the objects: it is that the teen curriculum
 * in the Tech Mentor role runs on exactly these three things, so the photos are
 * evidence for a paid role rather than a claim standing on its own.
 *
 * Every photo here was taken by me of a build I made. The backgrounds were cut
 * out so eleven phone photos taken across a year in three different rooms read
 * as one set — the subject is the point, the library table behind it is not.
 */
export const hardwareGroups: GalleryGroup[] = [
  {
    id: 'arduino',
    label: 'Arduino & Embedded',
    blurb: 'Breadboards, jumper wires and the kit the teens start on',
    accent: 'cyan',
    items: [
      img(
        'arduino-redboard-chassis',
        'SparkFun RedBoard and breadboard wired up for a motor build',
        'A red SparkFun RedBoard mounted on a black baseplate next to a breadboard, with coloured jumper wires running off the header pins',
      ),
    ],
  },
  {
    id: 'printing',
    label: '3D Printing',
    /* "Sliced, tuned and printed", not "modelled". The print settings, the
       supports and the failed attempts before each of these are mine; claiming
       the models are as well is a claim a reader can check and I cannot back. */
    blurb: 'Sliced, tuned and printed in PLA',
    accent: 'fuchsia',
    items: [
      img(
        'print-dragon-black',
        'Winged dragon, black PLA',
        'A black 3D-printed winged dragon figure with outstretched wings',
      ),
      img(
        'print-batman-cowl',
        'Batman cowl, black PLA',
        'A small black 3D-printed Batman cowl with pointed ears',
      ),
      img(
        'print-karambit-parts',
        'Karambit trainer printed as separate parts for assembly',
        'Seven white 3D-printed knife parts laid out flat: two handle halves, blade plates and two pins',
      ),
      img(
        'print-dragon-orange',
        'Dragon in orange PLA, printed flat with supports',
        'An orange 3D-printed dragon lying on its side with visible layer lines',
      ),
      img(
        'print-super-saiyan',
        'Super Saiyan figure on a two-tone aura base',
        'A grey 3D-printed muscular figure with spiked hair standing on a black spiked aura base',
      ),
      img(
        'print-aura-figure',
        'Aura figure, grey PLA',
        'A grey 3D-printed figure surrounded by a swirling printed smoke and aura effect',
      ),
    ],
  },
  {
    id: 'lego',
    label: 'Lego & Robotics',
    blurb: 'SPIKE Prime kits, built and programmed',
    accent: 'green',
    items: [
      img(
        'lego-spike-scooter',
        'SPIKE Prime two-wheel scooter bot',
        'A LEGO SPIKE Prime robot built as a two-wheeled scooter with a tall sensor mast',
      ),
      img(
        'lego-spike-workbench',
        'SPIKE Prime walker with a light sensor head',
        'A standing LEGO SPIKE Prime robot on two legs with a lit light sensor mounted as its head',
      ),
      img(
        'lego-spike-matrix-bot',
        'SPIKE Prime driving base running a light-matrix program',
        'A small LEGO SPIKE Prime driving robot with its light matrix lit up in orange',
      ),
      img(
        'lego-spike-driving-base',
        'SPIKE Prime driving base with distance sensor',
        'A LEGO SPIKE Prime driving base with large wheels, a lit hub and a distance sensor on the front',
      ),
    ],
  },
]
