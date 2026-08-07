/**
 * Cross-hook coordination flags.
 *
 * Deliberately a module-scoped mutable object rather than React state: these
 * are read inside scroll and IntersectionObserver callbacks that must see the
 * current value immediately, not the value captured when the effect last ran.
 * A stale `false` here reintroduces the feedback loop described below.
 *
 * The loop, for the record: the spy writes the URL, the URL change triggers a
 * scroll, the scroll fires the spy, and the page sticks or jitters forever. It
 * looks like an animation bug. It is not.
 */
export const navFlags = {
  /** True while a programmatic scroll is in flight — the spy must not write. */
  suspendSpy: false,
  /** True while the door overlay owns the scroll — useRouteScroll must stand down. */
  doorActive: false,
}

/**
 * Release a scroll suspension once the scroll actually settles.
 *
 * `scrollend` is missing in Safari < 18, and iOS keeps firing `scroll` through
 * rubber-banding and momentum. So the release is time-bounded as well as
 * event-driven — never purely one or the other.
 */
export function releaseSpyAfterScroll(timeoutMs = 900): () => void {
  let done = false

  const finish = () => {
    if (done) return
    done = true
    navFlags.suspendSpy = false
    window.removeEventListener('scrollend', finish)
    clearTimeout(timer)
  }

  const timer = setTimeout(finish, timeoutMs)
  window.addEventListener('scrollend', finish, { once: true })

  return finish
}
