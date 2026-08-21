# Personal Website

Portfolio site for Shubham Puri, software engineer.

**Live:** https://spuridev.vercel.app/

## Stack

React 19, TypeScript, Vite 7, CSS Modules, Motion, React Router 7. Deployed on Vercel.

No UI framework and no CSS framework. Styling is CSS Modules over a three-tier
token layer (primitive values, then semantic roles, then per-component vars), so
a colour or spacing change happens in one file.

## Structure

```
src/
  data/          all content: profile, experience, projects, skills, education
  components/    sections/, bounty/, hero/, layout/, ui/, transitions/
  routes/        one page component; the URL selects where you land, not what renders
  lib/           routing helpers, icons, scroll, storage
  hooks/         scroll spy, route scroll
public/          resume, diploma, certificates, OG card
```

Every section renders from typed data in `src/data/`. No component contains a
name, a date, or a URL, so updating the resume means editing that folder and
nothing else. `src/data/index.ts` runs dev-only invariants that fail loudly on a
duplicate slug or a door path that does not match its section id.

## Two skins

The site ships a `poster` mode and a `plain` mode, toggled in the nav and stored
in `localStorage`. Plain mode is not a stylesheet swap with the animations left
running: motion is switched off in three layers, and the decorative components
are not rendered at all. Anyone with `prefers-reduced-motion: reduce` lands in
plain mode on the first paint, before any CSS has been applied.

## Commands

```bash
npm install
npm run dev        # vite dev server
npm run typecheck  # tsc -b --noEmit
npm run build      # tsc -b && vite build
npm run preview    # serve the production build locally
```

Node 20 or newer.
