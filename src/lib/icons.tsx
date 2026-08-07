/**
 * Local SVG sprite. Replaces the Font Awesome CDN (~30 KB of CSS plus a
 * webfont download) for the ~25 icons this site actually uses.
 *
 * One consistent 24x24 stroke set rather than a mix of brand logos — a uniform
 * geometric set reads as deliberate; approximated logos read as broken.
 */

const P: Record<string, React.ReactNode> = {
  /* ---- generic ---- */
  check: <polyline points="20 6 9 17 4 12" />,
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  'arrow-left': (
    <>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </>
  ),
  'arrow-right': (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
  'chevron-down': <polyline points="6 9 12 15 18 9" />,
  external: (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </>
  ),
  play: <polygon points="6 3 20 12 6 21 6 3" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22 6 12 13 2 6" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C6.9 1.1 5.8 1.4 5.8 1.4A4.9 4.9 0 0 0 5.7 5a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 9.6 18V22" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  cert: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
      <circle cx="12" cy="15" r="2.5" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  cap: (
    <>
      <path d="M22 9 12 4 2 9l10 5 10-5Z" />
      <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" />
    </>
  ),

  /* ---- skill glyphs ---- */
  python: (
    <>
      <path d="M12 2c-3 0-4 1.3-4 3v2h4.5v1H6.5C4.6 8 3 9.4 3 12s1.6 4 3.5 4H8v-2.5C8 11.6 9.6 10 11.5 10h4c1.4 0 2.5-1.1 2.5-2.5V5c0-1.7-1-3-4-3Z" />
      <path d="M12 22c3 0 4-1.3 4-3v-2h-4.5v-1h6c1.9 0 3.5-1.4 3.5-4s-1.6-4-3.5-4H16v2.5c0 1.9-1.6 3.5-3.5 3.5h-4C7.1 14 6 15.1 6 16.5V19c0 1.7 1 3 4 3Z" />
    </>
  ),
  javascript: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 10v5a1.5 1.5 0 0 1-3 0" />
      <path d="M18 11a2 2 0 0 0-4 .3c0 2 3.5 1.6 3.5 3.4A2 2 0 0 1 14 15" />
    </>
  ),
  typescript: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M6.5 10h5M9 10v6" />
      <path d="M18 11a2 2 0 0 0-4 .3c0 2 3.5 1.6 3.5 3.4A2 2 0 0 1 14 15" />
    </>
  ),
  java: (
    <>
      <path d="M9 20c-2 0-3 .6-3 1s2 1 6 1 6-.6 6-1-1-1-3-1" />
      <path d="M8 17c-1.5 0-2.5.4-2.5.8S7 19 12 19s6.5-.8 6.5-1.2S17.5 17 16 17" />
      <path d="M13 3c2 2.5-2 3.5-2 6 0 1.5 2 2.5 2 2.5" />
      <path d="M16 8c1.5 1 1 3-4 4.5" />
    </>
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </>
  ),
  node: (
    <>
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
      <path d="M15 15a3 3 0 0 1-6 0V9" />
    </>
  ),
  server: (
    <>
      <rect x="2" y="3" width="20" height="8" rx="2" />
      <rect x="2" y="13" width="20" height="8" rx="2" />
      <line x1="6" y1="7" x2="6.01" y2="7" />
      <line x1="6" y1="17" x2="6.01" y2="17" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />
    </>
  ),
  docker: (
    <>
      <rect x="3" y="11" width="18" height="7" rx="1" />
      <path d="M6 11V8h3v3M11 11V8h3v3M11 8V5h3v3" />
      <path d="M3 18c3 2 15 2 18-3" />
    </>
  ),
  git: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="12" r="3" />
      <path d="M6 9v6M9 12h6" />
    </>
  ),
  terminal: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="7 9 10 12 7 15" />
      <line x1="13" y1="15" x2="17" y2="15" />
    </>
  ),
  graph: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8 7.5 10.5 16M16 7.5 13.5 16M8.5 6h7" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <circle cx="9" cy="14" r="1.2" />
      <circle cx="15" cy="14" r="1.2" />
      <path d="M12 8V4M9 4h6" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  fire: (
    <path d="M12 2s1 4-2 6.5C7 11 6 13 6 15a6 6 0 0 0 12 0c0-3-2-5-3-6.5-.7 1-1.5 1.5-2 1.5.5-3-1-6.5-1-8Z" />
  ),
  plug: (
    <>
      <path d="M9 2v6M15 2v6" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0Z" />
      <path d="M12 17v5" />
    </>
  ),
  rotate: (
    <>
      <polyline points="21 3 21 9 15 9" />
      <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
      <polyline points="3 21 3 15 9 15" />
      <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
    </>
  ),
  triangle: <polygon points="12 3 22 20 2 20" />,
  figma: (
    <>
      <circle cx="15" cy="12" r="3" />
      <path d="M12 3h3a3 3 0 0 1 0 6h-3Zm0 0H9a3 3 0 0 0 0 6h3Zm0 6H9a3 3 0 0 0 0 6h3Zm0 6v3a3 3 0 1 1-3-3Z" />
    </>
  ),
  board: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 7v7M12 7v10M16 7v4" />
    </>
  ),
  flask: (
    <>
      <path d="M9 2v6.5L4 19a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 19l-5-10.5V2" />
      <line x1="8" y1="2" x2="16" y2="2" />
      <line x1="6.5" y1="15" x2="17.5" y2="15" />
    </>
  ),
  cubes: (
    <>
      <path d="M12 2 7 5v6l5 3 5-3V5Z" />
      <path d="M7 11 2 14v6l5 3 5-3v-6Z" />
      <path d="M17 11l-5 3v6l5 3 5-3v-6Z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" />
    </>
  ),
  chart: (
    <>
      <line x1="3" y1="21" x2="21" y2="21" />
      <rect x="5" y="12" width="3.5" height="7" />
      <rect x="10.5" y="7" width="3.5" height="12" />
      <rect x="16" y="3" width="3.5" height="16" />
    </>
  ),
  mobile: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </>
  ),
  html: (
    <>
      <polyline points="8 8 4 12 8 16" />
      <polyline points="16 8 20 12 16 16" />
      <line x1="13.5" y1="6" x2="10.5" y2="18" />
    </>
  ),
}

export type IconName = keyof typeof P

export interface IconProps {
  name: string
  size?: number
  className?: string
  /** Decorative by default; pass a label to expose it to assistive tech. */
  label?: string
}

export function Icon({ name, size = 18, className, label }: IconProps) {
  const path = P[name]
  if (!path) return null

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      focusable="false"
    >
      {path}
    </svg>
  )
}

export function hasIcon(name: string | undefined): boolean {
  return Boolean(name && name in P)
}
