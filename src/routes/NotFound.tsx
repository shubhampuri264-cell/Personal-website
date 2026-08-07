import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <main className={styles.wrap}>
      <p className="sp-eyebrow">Error 404</p>
      <h1 className={styles.title}>No bounty here</h1>
      <p className={styles.copy}>
        That page does not exist. Everything worth finding is on the front page.
      </p>
      <Link to="/" className={styles.cta}>
        Back to the doors
      </Link>
    </main>
  )
}
