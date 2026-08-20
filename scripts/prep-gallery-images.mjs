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
 *   test -f package.json || exit 1   # see below
 *   npm i sharp @imgly/background-removal-node
 *
 * Check that `.imgprep/package.json` exists before installing. npm walks up
 * looking for one, so if `npm init` did not land, `npm i sharp` writes itself
 * into the site's own package.json and lockfile instead.
 *
 * `@imgly/background-removal-node` is only needed for the cutout jobs; the
 * photo jobs (`cutout: false`) run on sharp alone.
 *   node ../scripts/prep-gallery-images.mjs [id ...]
 *
 * With no arguments it rebuilds everything; with ids it rebuilds only those.
 *
 * Output names must stay stable: vercel.json serves /images/* as immutable, so
 * a changed photo under an existing name will be served stale. Give a re-crop a
 * new id and update the matching entry in src/data/.
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const DL = 'C:/Users/shubh/Downloads'
const PUBLIC = path.resolve(import.meta.dirname, '..', 'public', 'images')

// `preCrop` is in fractions of the EXIF-oriented frame, and is only used where
// the photo holds a second subject the model has no way to know is unwanted.
// `alphaFloor` is raised where it left a translucent ghost of something behind
// the subject (a bag, an instruction sheet, a parts bin).
// `cutout: false` skips the model entirely and keeps the photo whole: the
// letterbox bars are measured off and dropped, then the frame is cover-cropped
// to the same square canvas the cutouts land on, so both kinds of asset drop
// into the same grid without the CSS knowing the difference.
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
  /*
   * The PC photos take the `cutout: false` path. Cutting the background out of
   * these would delete the build: the case, the glass and the light spilling
   * onto the panels ARE the subject, and a floating motherboard on transparency
   * is not a picture of a PC. They are screenshots rather than camera files, so
   * they arrive letterboxed instead of EXIF-rotated.
   */
  {
    id: 'pc-full-build',
    out: 'hobbies',
    src: `${DL}/IMG_8621.png`,
    cutout: false,
    // Drops the shelf and the box of envelopes sitting above the case. The
    // square crop alone leaves a strip of it along the top edge.
    trim: { top: 0.16 },
  },
  { id: 'pc-interior-lit', out: 'hobbies', src: `${DL}/IMG_8624.png`, cutout: false },
  { id: 'pc-cooler-gpu', out: 'hobbies', src: `${DL}/IMG_8622.png`, cutout: false },
  { id: 'pc-intake-fans', out: 'hobbies', src: `${DL}/IMG_8623.png`, cutout: false },
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

/**
 * Drops the solid black bars a phone screenshot carries above and below the
 * photo. sharp's .trim() keys off the top-left pixel and gives up as soon as a
 * single row is not uniform, so the bar under a dark photo survives it. Measure
 * the first and last row holding any channel above the noise floor instead.
 */
async function trimLetterbox(buf) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  let top = -1
  let bottom = -1

  for (let y = 0; y < height; y++) {
    let max = 0
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      const v = Math.max(data[i], data[i + 1], data[i + 2])
      if (v > max) max = v
    }
    // JPEG-ish noise puts a black bar a few levels off zero, so 24 rather than 0.
    if (max > 24) {
      if (top < 0) top = y
      bottom = y
    }
  }

  if (bottom < 0) throw new Error('frame is entirely black')
  if (top === 0 && bottom === height - 1) return buf

  console.log(`  letterbox: kept rows ${top}..${bottom} of ${height}`)
  return sharp(buf)
    .extract({ left: 0, top, width, height: bottom - top + 1 })
    .png()
    .toBuffer()
}

for (const { id, out, src, preCrop, alphaFloor, cutout = true, position = 'centre', trim } of JOBS) {
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

    let subject
    if (cutout) {
      // Pass a Blob, not a path — the library treats a bare string as a URL and
      // chokes on `C:\`.
      // Imported here, not at the top: a `cutout: false` job needs nothing but
      // sharp, and a static import would make it drag onnxruntime in to do
      // nothing with it.
      const { removeBackground } = await import('@imgly/background-removal-node')

      const blob = await removeBackground(new Blob([oriented], { type: 'image/png' }), {
        output: { format: 'image/png' },
      })

      subject = await hardenAndCrop(
        Buffer.from(await blob.arrayBuffer()),
        alphaFloor ?? DEFAULT_ALPHA_FLOOR,
      )
    } else {
      subject = await trimLetterbox(oriented)

      if (trim) {
        // Fractions of each edge to drop, measured off the de-letterboxed
        // frame rather than the original — the bars are gone by this point and
        // a fraction of the raw screenshot would mean something else entirely.
        const m = await sharp(subject).metadata()
        const left = Math.round(m.width * (trim.left ?? 0))
        const top = Math.round(m.height * (trim.top ?? 0))
        subject = await sharp(subject)
          .extract({
            left,
            top,
            width: m.width - left - Math.round(m.width * (trim.right ?? 0)),
            height: m.height - top - Math.round(m.height * (trim.bottom ?? 0)),
          })
          .png()
          .toBuffer()
      }
    }

    const meta = await sharp(subject).metadata()
    console.log(`  subject ${meta.width}x${meta.height}`)

    for (const [suffix, size] of SIZES) {
      const inner = Math.round(size * 0.92)
      const pad = Math.round((size - inner) / 2)
      const dest = path.join(dir, `${id}-${suffix}.webp`)

      // A cutout is inset so the subject does not touch the tile edge. A photo
      // is the opposite: it fills the square edge to edge, because a gap around
      // a photograph reads as a mistake rather than as breathing room.
      const canvas = cutout
        ? sharp(subject)
            .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .extend({
              top: pad,
              bottom: size - inner - pad,
              left: pad,
              right: size - inner - pad,
              background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
        : sharp(subject).resize(size, size, { fit: 'cover', position })

      await canvas.webp({ quality: 82, alphaQuality: 90, effort: 5 }).toFile(dest)

      const { size: bytes } = await fs.stat(dest)
      console.log(`  ${suffix}: ${Math.round(bytes / 1024)} KB`)
    }
  } catch (err) {
    console.error(`  FAILED ${id}: ${err.message}`)
  }
}

console.log('\ndone')
