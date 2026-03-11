import { useEffect, useRef } from 'react'

const TRAIL = 14  // number of trail dots

/**
 * Cursor
 * Custom cursor system:
 * - Dot  — snaps instantly to pointer
 * - Ring — lags behind for depth
 * - Trail — 14 fading dots follow with staggered delay
 */
export function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    /* ── build trail DOM ── */
    const trailEls = Array.from({ length: TRAIL }, (_, i) => {
      const el = document.createElement('div')
      el.className = 'cursor-trail'
      document.body.appendChild(el)
      return el
    })

    let mx = 0, my = 0, rx = 0, ry = 0
    // Ring of historical positions
    const hist = Array.from({ length: TRAIL * 3 }, () => ({ x: 0, y: 0 }))
    let hIdx = 0

    const onMove = (e) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove)

    let raf
    const tick = () => {
      /* dot */
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`
        dotRef.current.style.top  = `${my}px`
      }
      /* ring lags */
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`
        ringRef.current.style.top  = `${ry}px`
      }
      /* trail history */
      hist[hIdx] = { x: mx, y: my }
      hIdx = (hIdx + 1) % hist.length

      trailEls.forEach((el, i) => {
        const back = (hIdx - 1 - i * 2 + hist.length * 4) % hist.length
        const pos  = hist[back]
        const t    = 1 - i / TRAIL
        el.style.left    = `${pos.x}px`
        el.style.top     = `${pos.y}px`
        el.style.width   = `${t * 7}px`
        el.style.height  = `${t * 7}px`
        el.style.opacity = String(t * 0.45)
      })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    /* hover grow */
    const grow   = () => { dotRef.current?.classList.add('big');    ringRef.current?.classList.add('big') }
    const shrink = () => { dotRef.current?.classList.remove('big'); ringRef.current?.classList.remove('big') }
    const watch  = () => {
      document.querySelectorAll('a,button,.bracket-card,.skill-tag,.cert-card,.b-box,.theme-toggle')
        .forEach((el) => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })
    }
    watch()
    // Re-attach after DOM updates
    const mo = new MutationObserver(watch)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      mo.disconnect()
      trailEls.forEach((el) => el.remove())
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  id="cursor"      />
      <div ref={ringRef} id="cursor-ring" />
    </>
  )
}
