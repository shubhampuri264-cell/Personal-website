/**
 * Build guard: vercel.json's SPA rewrite must list exactly the sections that
 * SECTION_ORDER declares.
 *
 * The rewrite is what makes a deep link work at all. Before it was narrowed it
 * matched every path, which meant `/nope` quietly served the homepage with a
 * 200 and every typo'd URL was a soft 404 to a crawler. Narrowing it fixed
 * that and created a new failure mode in its place: add a section to
 * SECTION_ORDER, forget this file, and the new section's URL 404s in
 * production while working perfectly in dev. That is exactly the kind of bug
 * nobody finds for a month, so it fails the build instead.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const routesSrc = readFileSync(resolve(root, 'src/lib/routes.ts'), 'utf8')
const block = routesSrc.match(/SECTION_ORDER:\s*SectionId\[\]\s*=\s*\[([\s\S]*?)\]/)
if (!block) throw new Error('check-routes: could not find SECTION_ORDER in src/lib/routes.ts')

// 'home' is served at `/`, which needs no rewrite rule, so it is not expected.
const sections = [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1]).filter((s) => s !== 'home')

const vercel = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'))
const rule = vercel.rewrites?.find((r) => r.destination === '/index.html')
if (!rule) throw new Error('check-routes: vercel.json has no rewrite to /index.html')

const group = rule.source.match(/\(([a-z|]+)\)/)
if (!group) throw new Error(`check-routes: cannot read the section list out of "${rule.source}"`)
const listed = group[1].split('|')

const missing = sections.filter((s) => !listed.includes(s))
const extra = listed.filter((s) => !sections.includes(s))

if (missing.length || extra.length) {
  const lines = ['check-routes: vercel.json and SECTION_ORDER disagree.']
  if (missing.length) lines.push(`  in SECTION_ORDER but not in the rewrite: ${missing.join(', ')}`)
  if (extra.length) lines.push(`  in the rewrite but not in SECTION_ORDER: ${extra.join(', ')}`)
  lines.push(`  fix the "source" pattern in vercel.json to: /(${sections.join('|')})(/[^/]+)?`)
  console.error(lines.join('\n'))
  process.exit(1)
}

console.log(`check-routes: ${listed.length} sections, vercel.json in sync.`)
