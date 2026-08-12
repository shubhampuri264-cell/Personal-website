/**
 * Turns raw phone photos into the gallery assets under `public/images/`.
 *
 * Phone photos arrive at ~4000x3000 and 2-4 MB, half of them carrying an EXIF
 * orientation flag, shot against whatever was on the table. This bakes the
 * rotation in, cuts the subject out, and writes two transparent WebPs per photo
 * so eleven pictures taken across a year in three rooms read as one set.
 *
 * Deliberately NOT a package.json dependency. It runs once per new photo and
 * pulls in onnxruntime, which has no business in the site's install:
 *
 *   mkdir -p .imgprep && cd .imgprep
 *   npm init -y && npm pkg set type=module
 *   npm i sharp @imgly/background-removal-node
 *   node ../scripts/prep-gallery-images.mjs [id ...]
 *
 * With no arguments it rebuilds everything; with ids it rebuilds only those.
 *
 * Output names must stay stable: vercel.json serves /images/* as immutable, so
 * a changed photo under an existing name will be served stale. Give a re-crop a
 * new id and update the matching entry in src/data/.
 */
import { removeBackground } from '@imgly/background-removal-node'
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const DL = 'C:/Users/shubh/Downloads'
const PUBLIC = path.resolve(import.meta.dirname, '..', 'public', 'images')

// `preCrop` is in fractions of the EXIF-oriented frame, and is only used where
// the photo holds a second subject the model has no way to know is unwanted.
// `alphaFloor` is raised where it left a translucent ghost of something behind
// the subject (a bag, an instruction sheet, a parts bin).
const JOBS = [
  { id: 'arduino-redboard-chassis', out: 'hardware', src: `${DL}/Arduino.jpeg`, alphaFloor: 140 },
  {
    id: 'print-dragon-black',
    out: 'hardware',
    src: `${DL}/3D Printed Models/image-20250708-170552-5ca5b9ac.jpeg`,
  },
  {
    id: 'print-batman-cowl',
    out: 'hardware',
    src: `${DL}/3D Printed Models/image-20250813-215922-827a4675.jpeg`,
    // Drops the mug and the desk edge; the model kept the whole white desktop.
    preCrop: { left: 0.15, top: 0.1, width: 0.6, height: 0.45 },
  },
  {
    id: 'print-karambit-parts',
    out: 'hardware',
    src: `${DL}/3D Printed Models/image-20250919-215749-715523bb.jpeg`,
  },
  {
    id: 'print-dragon-orange',
    out: 'hardware',
    src: `${DL}/3D Printed Models/image-20251011-173401-a1a6668a.jpeg`,
  },
  {
    id: 'print-super-saiyan',
    out: 'hardware',
    src: `${DL}/3D Printed Models/image-20260401-233547-b88bc07d.jpeg`,
  },
  {
    id: 'print-aura-figure',
    out: 'hardware',
    src: `${DL}/3D Printed Models/image-20260401-233601-86d08656.jpeg`,
  },
  {
    id: 'lego-spike-scooter',
    out: 'hardware',
    src: `${DL}/Legos & Robotics/image-20250701-223630-ae051e9c.jpeg`,
  },
  {
    id: 'lego-spike-workbench',
    out: 'hardware',
    src: `${DL}/Legos & Robotics/image-20250709-205049-80d0b75e.jpeg`,
    // Isolates the standing bot from the laptop, phone, bottle and wrappers.
    preCrop: { left: 0.32, top: 0.05, width: 0.44, height: 0.47 },
    alphaFloor: 140,
  },
  {
    id: 'lego-spike-matrix-bot',
    out: 'hardware',
    src: `${DL}/Legos & Robotics/image-20250723-202322-b1817039.jpeg`,
  },
  {
    id: 'lego-spike-driving-base',
    out: 'hardware',
    src: `${DL}/Legos & Robotics/image-20250923-232223-d336211a.jpeg`,
    alphaFloor: 140,
  },
  // TODO: point `src` at the PC build photo once it lands in Downloads, then
  // uncomment the matching item in src/data/hobbies.ts.
  // { id: 'pc-build', out: 'hobbies', src: `${DL}/PC.jpeg` },
]

// Square, not 4:3. The subjects are a mix of portrait (standing figures) and
// landscape (flat lays); a square canvas is the only one that does not
// systematically shrink one of the two.
const SIZES = [
  ['full', 1200],
  ['thumb', 600],
]

/** Below this, a pixel is segmentation haze rather than subject. */
const DEFAULT_ALPHA_FLOOR = 60

const ONLY = new Set(process.argv.slice(2))

/**
 * sharp's .trim() reads the soft matte the model emits as content, so it trims
 * nothing. Zero the haze first, then measure the box off what is left.
 */
async function hardenAndCrop(png, floor) {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  let minX = width
  let minY = height
  let maxX = -1
  let maxY = -1

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels + 3
      if (data[i] < floor) {
        data[i] = 0
        continue
      }
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }

  if (maxX < 0) throw new Error('cutout is empty after hardening')

  return sharp(data, { raw: { width, height, channels } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .png()
    .toBuffer()
}

for (const { id, out, src, preCrop, alphaFloor } of JOBS) {
  if (ONLY.size && !ONLY.has(id)) continue
  console.log(`\n=== ${id}`)

  try {
    const dir = path.join(PUBLIC, out)
    await fs.mkdir(dir, { recursive: true })

    // Rotate to a real buffer first. `.metadata()` reports the pre-rotation
    // dimensions even with `.rotate()` in the chain, so a preCrop measured off
    // it lands on the wrong axes.
    let pipe = sharp(await sharp(src).rotate().toBuffer())

    if (preCrop) {
      const meta = await pipe.metadata()
      pipe = pipe.extract({
        left: Math.round(meta.width * preCrop.left),
        top: Math.round(meta.height * preCrop.top),
        width: Math.round(meta.width * preCrop.width),
        height: Math.round(meta.height * preCrop.height),
      })
      console.log(`  pre-cropped from ${meta.width}x${meta.height}`)
    }

    const oriented = await pipe.resize({ width: 1600, withoutEnlargement: true }).png().toBuffer()

    // Pass a Blob, not a path — the library treats a bare string as a URL and
    // chokes on `C:\`.
    const blob = await removeBackground(new Blob([oriented], { type: 'image/png' }), {
      output: { format: 'image/png' },
    })

    const subject = await hardenAndCrop(
      Buffer.from(await blob.arrayBuffer()),
      alphaFloor ?? DEFAULT_ALPHA_FLOOR,
    )
    const meta = await sharp(subject).metadata()
    console.log(`  subject ${meta.width}x${meta.height}`)

    for (const [suffix, size] of SIZES) {
      const inner = Math.round(size * 0.92)
      const pad = Math.round((size - inner) / 2)
      const dest = path.join(dir, `${id}-${suffix}.webp`)

      await sharp(subject)
        .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .extend({
          top: pad,
          bottom: size - inner - pad,
          left: pad,
          right: size - inner - pad,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .webp({ quality: 82, alphaQuality: 90, effort: 5 })
        .toFile(dest)

      const { size: bytes } = await fs.stat(dest)
      console.log(`  ${suffix}: ${Math.round(bytes / 1024)} KB`)
    }
  } catch (err) {
    console.error(`  FAILED ${id}: ${err.message}`)
  }
}

console.log('\ndone')
