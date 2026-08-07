/**
 * localStorage that cannot throw. Safari in private browsing raises on every
 * write, and a portfolio site should not white-screen over a theme preference.
 */

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* quota exceeded or private mode — the in-memory state is still correct */
  }
}
