/**
 * All programmatic scrolling goes through here so behaviour is decided per
 * call. `scroll-behavior: smooth` is never set globally — a global smooth
 * scroll becomes an uncancellable animation that races the door transition
 * and the scroll spy, and the symptom looks like a bug in the animation layer.
 */

export function scrollToElement(el: Element, smooth: boolean): void {
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
}

export function scrollToTop(smooth: boolean): void {
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
}

/** Stable pseudo-random in [-1, 1] from a string — used for poster tilt. */
export function hashToUnit(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 2000) / 1000 - 1
}
