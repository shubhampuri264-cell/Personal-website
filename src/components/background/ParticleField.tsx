import { useEffect, useRef } from 'react'
import { useMode } from '@/context/ModeContext'
import styles from './ParticleField.module.css'

const COLORS = ['#22d3ee', '#d946ef', '#4ade80']

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  c: string
}

/**
 * Replaces particles.js 2.0.0 — unmaintained since ~2016, no reduced-motion
 * awareness, and a full re-init on every resize.
 *
 * Gated four ways, because an always-on canvas is a battery tax:
 *   1. not rendered at all when motion is off
 *   2. paused when the tab is hidden
 *   3. paused when it scrolls out of view
 *   4. particle count scales with viewport area
 *
 * Line-linking is dropped below 768px — it is O(n²) per frame and it, not the
 * dots, is what actually costs on a phone.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { motionOff } = useMode()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let dots: Dot[] = []
    let raf = 0
    let running = true
    let inView = true
    let width = 0
    let height = 0
    let linkDistance = 0

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      const ratio = dpr()
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

      // Gate 4: count follows area, capped at both ends.
      const target = Math.round(Math.min(70, Math.max(18, (width * height) / 26000)))
      linkDistance = width < 768 ? 0 : 130

      dots = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: Math.random() * 1.6 + 0.7,
        c: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      }))
    }

    const frame = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > width) d.vx *= -1
        if (d.y < 0 || d.y > height) d.vy *= -1

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = d.c
        ctx.globalAlpha = 0.55
        ctx.fill()
      }

      if (linkDistance > 0) {
        ctx.lineWidth = 1
        for (let i = 0; i < dots.length; i += 1) {
          for (let j = i + 1; j < dots.length; j += 1) {
            const a = dots[i]!
            const b = dots[j]!
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dist = Math.hypot(dx, dy)
            if (dist > linkDistance) continue
            ctx.beginPath()
            ctx.globalAlpha = (1 - dist / linkDistance) * 0.16
            ctx.strokeStyle = '#a7f3d0'
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // Gate 2: tab hidden.
    const onVisibility = () => {
      if (document.hidden) stop()
      else if (inView) start()
    }

    // Gate 3: scrolled out of view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting)
        if (inView && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )

    resize()
    raf = requestAnimationFrame(frame)
    observer.observe(canvas)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // Gate 1: unmounted, not hidden. A hidden canvas still burns a rAF loop.
  if (motionOff) return null

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
